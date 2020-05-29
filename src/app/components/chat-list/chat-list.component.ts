import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { Chat } from 'src/app/models/Chat';
import { Message } from 'src/app/models/Message';

@Component({
	selector: 'app-chat-list',
	templateUrl: './chat-list.component.html',
	styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

	public user: User
	public chats: Chat[]
	public currentChat: Chat
	public messages: Message[]

	constructor(private userService: UserService) {
		this.user = this.userService.user
		this.chats = this.user.chats
		console.log('current:', this.currentChat)
	}

	ngOnInit(): void {
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
