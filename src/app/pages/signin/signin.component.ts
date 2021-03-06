import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Observable } from 'rxjs'
import { first } from 'rxjs/operators'

import { ToastrService } from 'ngx-toastr'
import { User } from 'firebase'

import { AuthService } from '@services/auth.service'

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

	public user$: Observable<User> = this.authService.afAuth.user
	public email: string
	public password: string

	constructor(
		public authService: AuthService,
		public router: Router,
		private toastr: ToastrService
	) { }

	ngOnInit(): void {
		this.user$.pipe(first()).toPromise().then(user => {
			if (user)
				this.router.navigate(['/home'])
		})
	}

	async signin() {
		try {
			const user = await this.authService.signin(this.email, this.password)
			if (user.user) {
				if (user.user.emailVerified) {
					// console.log('sign in', this.email, this.password)
					this.toastr.success('Sign in successfully!')
					// console.log('user:', user.user)
					this.router.navigate(['/home'])
				} else {
					this.toastr.error('You must to vefify your email account')
					this.authService.signout()
				}
			}
		} catch (error) {
			this.toastr.error(error.message.split(':').pop(), error.code.split('/').pop())
		}
	}

	async signinGoogle() {
		try {
			if (await this.authService.signinGoogle()) {
				console.log('sign in with google')
				this.toastr.success('Sign in successfully!')
				this.router.navigate(['/home'])
			}
		} catch (error) {
			this.toastr.error(error.message.split(':').pop(), error.code.split('/').pop());
		}
	}
}
