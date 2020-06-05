import { Component, OnInit } from '@angular/core'

import { Observable } from 'rxjs'
import { first } from 'rxjs/operators'

import { AuthService } from 'src/app/services/auth.service'
import { UserService } from 'src/app/services/user.service'

import { User as fUser } from 'firebase'
import { User } from 'src/app/models/User'

import { Chat } from 'src/app/models/Chat'
import { Message } from '@angular/compiler/src/i18n/i18n_ast'

@Component({
	selector: 'app-chat-list',
	templateUrl: './chat-list.component.html',
	styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

	public user$: Observable<fUser> = this.authService.afAuth.user
	public users: User[]
	public currentUser: User
	public currentChat: Chat
	public destinationUID: string

	public chats: Chat[]
	public messages: Message[]

	constructor(
		private authService: AuthService, private userService: UserService) { }

	ngOnInit() {
		this.user$.pipe(first()).toPromise().then(cUser => {
			console.log(`current user: ${cUser.uid}`)
			this.userService.readUsers().subscribe(data => {
				this.currentUser = data.map(e => {
					let user = e.payload.doc.data() as User
					console.log(`current user: ${user.uid}`)
					if (cUser.uid == user.uid)
						return user
				})[0]
				this.chats = this.currentUser.chats
			})

		})
	}

	openChat(chat: Chat) {
		// let messages = chat.messages.sort(
		// 	(a: Message, b: Message) => {
		// 		return new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
		// 	}
		// )
		this.currentChat = chat
		console.log('current:', this.currentChat)
	}

	addContact() {

		console.log('User:', this.currentUser)
	}
}
