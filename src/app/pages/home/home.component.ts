import { Component } from '@angular/core'

import { Observable } from 'rxjs'
import { User as fUser } from 'firebase'

import { AuthService } from '@services/auth.service'
import { Chat } from '@models/Chat'

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
