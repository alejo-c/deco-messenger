import { Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'

import { Observable } from 'rxjs'
import { first } from 'rxjs/operators'
import { AuthService } from 'src/app/services/auth.service'
import { ToastrService } from 'ngx-toastr'
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
	public displayName: string
	public email: string
	public password: string

	constructor(public authService: AuthService, public router: Router, public toastr: ToastrService) {
	}

	ngOnInit(): void {
		this.user$.pipe(first()).toPromise().then(user => {
			if (user)
				this.router.navigate(['/home'])
		})
	}

	async signup() {
		try {
			const user = await this.authService.signup(this.displayName, this.email, this.password)
			if (user) {
				console.log('sign up', this.displayName, this.email, this.password)
				this.basicModal.show()
			}
		} catch (error) {
			this.toastr.error(error.message.split(':').pop(), error.code.split('/').pop());
		}
	}

	async signupGoogle() {
		try {
			if (await this.authService.signupGoogle()) {
				console.log('sign up with google')
			}
		} catch (error) {
			this.toastr.error(error.message.split(':').pop(), error.code.split('/').pop());
		}
	}

	closeModal() {
		this.basicModal.hide()
		this.router.navigate(['/signin'])
	}

	async resendEmail() {
		try {
			await this.authService.sendEmailVerification()
		} catch (error) {
			console.log('Can not resend email verification')
		}
	}
}
