import { Component, Input, OnInit } from '@angular/core'

import { Observable } from 'rxjs'
import { first } from 'rxjs/operators'
import { User as fUser } from 'firebase'

import { AuthService } from '@services/auth.service'
import { UserService } from '@services/user.service'

import { User } from '@models/User'
import { Chat } from '@models/Chat'
import { Message } from '@models/Message'

@Component({
	selector: 'app-chat-preview',
	templateUrl: './chat-preview.component.html',
	styleUrls: ['./chat-preview.component.scss']
})
export class ChatPreviewComponent implements OnInit {

	@Input() chat: Chat
	@Input() messages: Message[]
	private user$: Observable<fUser> = this.authService.afAuth.user
	public destinationUser: User

	constructor(private authService: AuthService, private userService: UserService) { }

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
	}
}
