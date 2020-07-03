import { Component, OnInit, Output, EventEmitter } from '@angular/core'

import { Observable } from 'rxjs'
import { first } from 'rxjs/operators'
import { User as fUser } from 'firebase'

import { AuthService } from '@services/auth.service'
import { UserService } from '@services/user.service'
import { ChatService } from '@services/chat.service'

import { User } from '@models/User'
import { Chat } from '@models/Chat'

@Component({
	selector: 'app-chat-list',
	templateUrl: './chat-list.component.html',
	styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

	@Output() chatOutput = new EventEmitter<Chat>();

	public user$: Observable<fUser> = this.authService.afAuth.user
	public currentUser: User
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
		this.chatOutput.emit(chat)
	}

	addContact() {
		this.userService.readUser(this.contactUid).subscribe(data => {
			let contact = data.payload.data() as User

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
