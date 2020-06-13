import { Component, Input, OnChanges, HostListener } from '@angular/core'

import { Observable } from 'rxjs'
import { first } from 'rxjs/operators'

import { AuthService } from 'src/app/services/auth.service'
import { UserService } from 'src/app/services/user.service'
import { ChatService } from 'src/app/services/chat.service'

import { User as fUser } from 'firebase'
import { User } from 'src/app/models/User'
import { Chat } from 'src/app/models/Chat'
import { Message } from 'src/app/models/Message'

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnChanges {

	@Input() chat: Chat
	public user$: Observable<fUser> = this.authService.afAuth.user
	public currentUser: User
	public destinationUser: User
	public text: string

	constructor(
		public authService: AuthService,
		private userService: UserService,
		private chatService: ChatService
	) { }

	ngOnChanges() {
		if (this.chat) {
			this.user$.pipe(first()).toPromise().then(currentUser => {
				let destinationUid = this.chat.usersUid.filter(userUid => {
					return userUid != currentUser.uid
				})[0]

				this.userService.readUsers().subscribe(data => {
					this.destinationUser = data.filter(e => {
						return (e.payload.doc.data() as User).uid == destinationUid
					})[0].payload.doc.data() as User

					this.currentUser = data.filter(e => {
						return (e.payload.doc.data() as User).uid == currentUser.uid
					})[0].payload.doc.data() as User
				})
			})

			this.chatService.readChatMessages(this.chat.id).subscribe(data => {
				this.chat.messages = data.map(e => {
					return e.payload.doc.data() as Message
				})

				this.chat.messages = this.chat.messages.sort(
					(a: Message, b: Message) => {
						return new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
					}
				)
			})
		}
	}

	sendMessage() {
		if (this.text) {
			let message: Message = {
				datetime: new Date().toISOString(),
				ownerUid: this.currentUser.uid,
				text: this.text
			}
			// console.log(message)
			this.chatService.createMessage(this.chat.id, message).then(() => {
				if (!this.destinationUser.contacts.includes(this.currentUser.uid)) {
					this.destinationUser.contacts.push(this.currentUser.uid)
					this.userService.updateUser(this.destinationUser)
				}
			}).catch(error => {
				console.log('error:', error)
			})
			this.text = null
		}
	}
}
