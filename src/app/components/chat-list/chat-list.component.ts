import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { Chat } from 'src/app/models/Chat';

@Component({
	selector: 'app-chat-list',
	templateUrl: './chat-list.component.html',
	styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

	public chats: Chat[]
	public currentChat: Chat

	constructor(private userService: UserService) {
		this.chats = this.userService.user.chats
	}

	ngOnInit(): void {
	}

}
