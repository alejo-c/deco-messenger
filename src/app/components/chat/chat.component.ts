import { Component, OnInit, Input } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { Chat } from 'src/app/models/Chat';
import { Message } from 'src/app/models/Message';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

	public user: User
	@Input() public chat: Chat
	@Input() public messages: Message[]

	constructor(private userService: UserService) {
		this.user = this.userService.user
	}

	ngOnInit(): void {
	}

}
