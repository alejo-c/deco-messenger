import { Component, Input } from '@angular/core';

import { Chat } from 'src/app/models/Chat';
import { Message } from 'src/app/models/Message';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

	@Input() public chat: Chat
	@Input() public messages: Message[]

	constructor() {

	}
}
