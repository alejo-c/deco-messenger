import { Component, OnInit, Input } from '@angular/core';

import { Chat } from 'src/app/models/Chat';

@Component({
	selector: 'app-chat-preview',
	templateUrl: './chat-preview.component.html',
	styleUrls: ['./chat-preview.component.scss']
})
export class ChatPreviewComponent implements OnInit {

	@Input() chat: Chat

	constructor() { }

	ngOnInit(): void {
	}

}
