import { Component, Input, OnChanges, HostListener } from '@angular/core'

import { Observable } from 'rxjs'
import { first } from 'rxjs/operators'

import { AuthService } from '@services/auth.service'
import { UserService } from '@services/user.service'
import { ChatService } from '@services/chat.service'
import { EncryptService } from '@services/encrypt.service'

import { User as fUser } from 'firebase'
import { User } from '@models/User'
import { Chat } from '@models/Chat'
import { Message } from '@models/Message'

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

	public isHovering: boolean
	public fileName: string = 'Choose File'

	constructor(
		private authService: AuthService,
		private userService: UserService,
		private chatService: ChatService,
		private encrypt: EncryptService
	) { }

	ngOnChanges() {
		if (this.chat) {
			this.user$.pipe(first()).toPromise().then(currentUser => {
				let destinationUid = this.chat.usersUid.filter(
					userUid => {
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

			this.chatService.readChatMessages(this.chat.id).subscribe(
				data => {
					this.chat.messages = data.map(e => {
						return e.payload.doc.data() as Message
					})

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
				})
		}
	}

	sendMessage() {
		if (this.text) {
			let message: Message = {
				datetime: new Date().toISOString(),
				ownerUid: this.currentUser.uid,
				text: this.text,
				type: 'message'
			}

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

	toggleHover(event: boolean) {
		this.isHovering = event
	}

	onDrop(files: FileList) {
		for (let i = 0; i < files.length; i++)
			this.chatService.createFileMessage(
				this.chat.id, this.currentUser.uid, files.item(i)
			)
	}

	chooseFile(event: any) {
		if (event.target.files) {
			this.fileName = `Last upload: ${event.target.files[0].name}`
			this.onDrop(event.target.files)
		}
	}
}
