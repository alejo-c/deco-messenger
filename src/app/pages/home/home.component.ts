import { Component } from '@angular/core'

import { Observable } from 'rxjs'

import { AuthService } from 'src/app/services/auth.service'

import { User as fUser } from 'firebase'
import { Chat } from 'src/app/models/Chat'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {

	public user$: Observable<fUser> = this.authService.afAuth.user
	public currentChat: Chat

	constructor(private authService: AuthService) { }

	openChat(chat: Chat) {
		this.currentChat = chat
	}
}
