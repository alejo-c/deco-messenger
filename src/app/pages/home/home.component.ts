import { Component } from '@angular/core'

import { AuthService } from 'src/app/services/auth.service'
import { User } from 'firebase'
import { Observable } from 'rxjs'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {

	public user$: Observable<User> = this.authService.afAuth.user

	constructor(public authService: AuthService) { }
}
