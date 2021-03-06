import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'

import { EncryptService } from './encrypt.service'
import { FilesService } from './files.service'

import { Chat } from '@models/Chat'
import { Message } from '@models/Message'

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	public chat: Chat

	constructor(
		private firestore: AngularFirestore,
		private storage: AngularFireStorage,
		private encryptService: EncryptService,
		private fileService: FilesService
	) { }

	createChat(chat: Chat): Promise<void> {
		return this.firestore.collection('chats').doc(chat.id)
			.set(chat, { merge: true })
	}

	createMessage(chatId: string, message: Message) {
		if (message.type == 'message')
			message.text = this.encryptService.encrypt(message.text, chatId)
		return this.firestore.collection('chats').doc(chatId)
			.collection('messages').doc(this.generateId())
			.set(message, { merge: true })
	}

	async createFileMessage(
		chatId: string, ownerUid: string, file: File
	) {
		const path = `files/${file.name}`
		const ref = this.storage.ref(path)

		const datetime = new Date().toISOString()

		let text = this.encryptService.encrypt(
			await this.fileService.text(file), chatId
		)

		this.storage.upload(path, new File(text.split(''), file.name))
			.then(() => {
				ref.getDownloadURL().toPromise().then(URL => {

					let message: Message = {
						datetime,
						ownerUid,
						name: file.name,
						type: 'file'
					}
					this.firestore.collection('chats').doc(chatId)
						.collection('messages').add(message)
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
