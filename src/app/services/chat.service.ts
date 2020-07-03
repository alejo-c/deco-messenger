import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'

import { EncryptService } from './encrypt.service'

import { Chat } from '@models/Chat'
import { Message } from '@models/Message'
import { PlainTextFile } from '@models/PlainTextFile'

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	public chat: Chat

	constructor(
		private firestore: AngularFirestore,
		private storage: AngularFireStorage,
		private encrypt: EncryptService
	) { }

	createChat(chat: Chat): Promise<void> {
		return this.firestore.collection('chats').doc(chat.id)
			.set(chat, { merge: true })
	}

	createMessage(chatId: string, message: Message) {
		if (message.type == 'message')
			message.text = this.encrypt.encrypt(message.text, chatId)
		return this.firestore.collection('chats').doc(chatId)
			.collection('messages').doc(this.generateId())
			.set(message, { merge: true })
	}

	async createFileMessage(
		chatId: string, ownerUid: string, files: FileList
	) {
		for (let i = 0; i < files.length; i++) {
			const file: File = files.item(i)

			const datetime = new Date().toISOString()
			const path = `files/${file.name}`
			const ref = this.storage.ref(path)

			this.storage.upload(path, file).then(() => {
				ref.getDownloadURL().toPromise().then(URL => {

					let plainTextFile: PlainTextFile = {
						datetime,
						ownerUid,
						URL,
						text: file.name,
						type: 'file'
					}
					this.firestore.collection('chats').doc(chatId)
						.collection('messages').add(plainTextFile)
				})
			})
		}
	}

	readChats() {
		return this.firestore.collection('chats').snapshotChanges()
	}

	readChatMessages(chatId: string) {
		return this.firestore.collection('chats').doc(chatId)
			.collection('messages').snapshotChanges()
	}

	updateChat(chat: Chat): Promise<void> {
		return this.firestore.doc('chats/' + chat.id).update(chat)
	}

	deteteChat(chatId: string): Promise<void> {
		return this.firestore.doc('chats/' + chatId).delete()
	}

	generateId(): string {
		return this.firestore.createId()
	}
}
