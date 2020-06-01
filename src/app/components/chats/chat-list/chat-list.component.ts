import { Component } from '@angular/core';

import { Chat } from 'src/app/models/Chat';
import { Message } from 'src/app/models/Message';

@Component({
	selector: 'app-chat-list',
	templateUrl: './chat-list.component.html',
	styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent {

	public chats: Chat[]
	public currentChat: Chat
	public messages: Message[]

	constructor() {
		// this.user = this.userService.user
		// this.chats = this.user.chats
		// console.log('current:', this.currentChat)
	}

	openChat(chat: Chat) {
		this.messages = chat.messages.sort(
			(a: Message, b: Message) => {
				return new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
			}
		)
		this.currentChat = chat
		console.log('current:', this.currentChat)
	}
}
