import { Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'

import { Observable } from 'rxjs'
import { first } from 'rxjs/operators'
import { AuthService } from 'src/app/services/auth.service'
import { User } from 'firebase'
import { ModalDirective } from 'angular-bootstrap-md'

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

	@ViewChild("basicModal") basicModal: ModalDirective;

	public user$: Observable<User> = this.authService.afAuth.user
	public username: string
	public email: string
	public password: string

	constructor(public authService: AuthService, public router: Router) {
	}

	ngOnInit(): void {
		this.user$.pipe(first()).toPromise().then(user => {
			if (user)
				this.router.navigate(['/home'])
		})
	}

	async signup() {
		const user = await this.authService.signup(this.email, this.password)
		if (user) {
			console.log('sign up', this.username, this.email, this.password)
			this.basicModal.show()
		}
	}

	async signupGoogle() {
		if (await this.authService.signupGoogle()) {
			console.log('sign up with google')
		}
	}

	closeModal() {
		this.basicModal.hide()
		this.router.navigate(['/signin'])
	}

	async resendEmail() {
		await this.authService.sendEmailVerification()
	}
}
