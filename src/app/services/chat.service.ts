import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'

import { Chat } from '@models/Chat'
import { Message } from '@models/Message'

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	public chat: Chat

	constructor(private firestore: AngularFirestore) { }

	createChat(chat: Chat): Promise<void> {
		return this.firestore.collection('chats').doc(chat.id)
			.set(chat, { merge: true })
	}

	createMessage(chatId: string, message: Message) {
		return this.firestore.collection('chats').doc(chatId)
			.collection('messages').doc(this.generateId())
			.set(message, { merge: true })
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
