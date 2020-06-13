import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Observable } from 'rxjs'
import { first } from 'rxjs/operators'
import { User } from 'firebase'

import { AuthService } from '@services/auth.service'

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	public user$: Observable<User> = this.authService.afAuth.user

	constructor(public authService: AuthService, private router: Router) { }

	ngOnInit(): void {
		this.user$.pipe(first()).toPromise().then(user => {
			if (!user)
				this.router.navigate(['/home'])
		})
	}

	updateProfile(): void {

	}

	deleteProfile(): void {

	}
}
