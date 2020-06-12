import { Component, OnInit } from '@angular/core'

import { Observable } from 'rxjs'
import { first } from 'rxjs/operators'

import { AuthService } from 'src/app/services/auth.service'
import { UserService } from 'src/app/services/user.service'
import { ChatService } from 'src/app/services/chat.service'

import { User as fUser } from 'firebase'
import { User } from 'src/app/models/User'

import { Chat } from 'src/app/models/Chat'

@Component({
	selector: 'app-chat-list',
	templateUrl: './chat-list.component.html',
	styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

	public user$: Observable<fUser> = this.authService.afAuth.user

	public currentUser: User
	public currentChat: Chat
	public contactUid: string

	public chats: Chat[]

	constructor(
		private authService: AuthService,
		private userService: UserService,
		private chatService: ChatService
	) { }

	ngOnInit() {
		this.user$.pipe(first()).toPromise().then(cUser => {
			this.userService.readUsers().subscribe(data => {
				this.currentUser = data.filter(e => {
					return (e.payload.doc.data() as User).uid == cUser.uid
				})[0].payload.doc.data() as User
			})

			this.chatService.readChats().subscribe(data => {
				this.chats = data.map(e => {
					let chat = e.payload.doc.data() as Chat
					for (const contact of this.currentUser.contacts)
						if (chat.usersUid.includes(contact))
							return chat
				}).filter(e => {
					return e != undefined
				})
			})
		})
	}

	openChat(chat: Chat) {
		// console.log('current chat:', chat)
		this.currentChat = chat
	}

	addContact() {
		// console.log('current user:', this.currentUser)
		// console.log('chats:', this.chats)
		// console.log('New contact:', this.contactUid)
		this.contactUid = null

		this.userService.readUser(this.contactUid).subscribe(data => {
			let contact = data.payload.data() as User
			// console.log('contact:', contact)
			if (contact) {

				if (!this.currentUser.contacts.includes(this.contactUid)) {
					this.currentUser.contacts.push(this.contactUid)

					this.userService.updateUser(this.currentUser).then(() => {
						this.chatService.createChat({
							id: this.chatService.generateId(),
							usersUid: [this.currentUser.uid, contact.uid]
						})
					}).catch(error => {
						console.log('error:', error)
					})
				}
			}
		})
	}
}
