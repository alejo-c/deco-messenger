import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'

import { EncryptService } from './encrypt.service'

import { Chat } from '@models/Chat'
import { Message } from '@models/Message'

// @ts-ignore
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

	async getTextFile(file: File) {
		return file.text?.toString()
	}

	createFileMessage(
		chatId: string, ownerUid: string, file: File
	) {
		const path = `files/${file.name}`
		const ref = this.storage.ref(path)

		const datetime = new Date().toISOString()

		let text
		this.getTextFile(file).then(t => {
			text = t
		})
		text = this.encrypt.encrypt(text, chatId)
		this.storage.upload(path, new File(text.split(''), file.name))
			.then(() => {
				ref.getDownloadURL().toPromise().then(URL => {

					let plainTextFile: Message = {
						datetime,
						ownerUid,
						URL,
						name: file.name,
						text: text,
						type: 'file'
					}
					this.firestore.collection('chats').doc(chatId)
						.collection('messages').add(plainTextFile)
				})
			})
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
