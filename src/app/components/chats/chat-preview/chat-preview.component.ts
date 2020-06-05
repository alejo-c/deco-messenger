import { Component, Input } from '@angular/core'

import { Chat } from 'src/app/models/Chat'
import { Message } from 'src/app/models/Message'

@Component({
	selector: 'app-chat-preview',
	templateUrl: './chat-preview.component.html',
	styleUrls: ['./chat-preview.component.scss']
})
export class ChatPreviewComponent {

	@Input() chat: Chat
	@Input() messages: Message[]

	constructor() { }
}
