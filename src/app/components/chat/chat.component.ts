import { Component, OnInit, Input } from '@angular/core';

import { Chat } from 'src/app/models/Chat';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

	@Input() chat: Chat

	constructor() { }

	ngOnInit(): void {
	}

}
