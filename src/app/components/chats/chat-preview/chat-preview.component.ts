import { Component, Input, OnInit } from '@angular/core'

import { Observable } from 'rxjs'
import { first } from 'rxjs/operators'
import { User as fUser } from 'firebase'

import { AuthService } from '@services/auth.service'
import { UserService } from '@services/user.service'
import { ChatService } from '@services/chat.service'
import { EncryptService } from '@services/encrypt.service'

import { User } from '@models/User'
import { Chat } from '@models/Chat'
import { Message } from '@models/Message'
import { PlainTextFile } from '@models/PlainTextFile'

@Component({
	selector: 'app-chat-preview',
	templateUrl: './chat-preview.component.html',
	styleUrls: ['./chat-preview.component.scss']
})
export class ChatPreviewComponent implements OnInit {

	@Input() chat: Chat

	private user$: Observable<fUser> = this.authService.afAuth.user
	public destinationUser: User
	public lastMessage: string

	constructor(
		private authService: AuthService,
		private userService: UserService,
		private chatService: ChatService,
		private encrypt: EncryptService
	) { }

	ngOnInit() {
		this.user$.pipe(first()).toPromise().then(currentUser => {
			let destinationUid = this.chat.usersUid.filter(userUid => {
				return userUid != currentUser.uid
			})[0]

			this.userService.readUsers().subscribe(data => {
				this.destinationUser = data.filter(e => {
					return (e.payload.doc.data() as User).uid == destinationUid
				})[0].payload.doc.data() as User
			})
		})

		this.chatService.readChatMessages(this.chat.id).subscribe(
			data => {
				this.chat.messages = data.map(e => {
					return e.payload.doc.data() as Message
				})

				if (this.chat.messages) {
					this.chat.messages.map(message => {
						if (message.type == 'message')
							message.text = this.encrypt.decrypt(message.text, this.chat.id)
					})

					this.chat.messages = this.chat.messages.sort(
						(a: Message, b: Message) => {
							return new Date(a.datetime).getTime()
								- new Date(b.datetime).getTime()
						}
					)

					let lastMessage = this.chat.messages[this.chat.messages.length - 1]
					if (lastMessage)
						this.lastMessage = lastMessage.text
				}
			})
	}
}
