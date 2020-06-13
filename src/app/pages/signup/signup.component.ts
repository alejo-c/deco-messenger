import { Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'

import { Observable } from 'rxjs'
import { first } from 'rxjs/operators'

import { ModalDirective } from 'angular-bootstrap-md'
import { ToastrService } from 'ngx-toastr'
import { User } from 'firebase'

import { AuthService } from '@services/auth.service'
import { UserService } from '@services/user.service'

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

	constructor(
		private authService: AuthService,
		private userService: UserService,
		public router: Router,
		private toastr: ToastrService
	) { }

	ngOnInit(): void {
		this.user$.pipe(first()).toPromise().then(user => {
			if (user)
				this.router.navigate(['/home'])
		})
	}

	async signup() {
		try {
			const user = (await this.authService.signup(this.displayName, this.email, this.password)).user
			if (user) {
				// console.log('sign up', this.displayName, this.email, this.password)
				this.userService.createUser({
					uid: user.uid,
					displayName: user.displayName,
					photoURL: user.photoURL,
					contacts: []
				}).then(user => {
					// console.log('Register user:', user)
				}).catch(error => {
					console.log('Not Registered:', error)
				})
				this.basicModal.show()
			}
		} catch (error) {
			this.toastr.error(error.message.split(':').pop(), error.code.split('/').pop());
		}
	}

	async signupGoogle() {
		try {
			const user = (await this.authService.signupGoogle()).user
			if (user) {
				this.userService.createUser({
					uid: user.uid,
					displayName: user.displayName,
					photoURL: user.photoURL,
					contacts: []
				}).then(user => {
					// console.log('Register user:', user)
				}).catch(error => {
					console.log('Not Registered:', error)
				})
			}
		} catch (error) {
			this.toastr.error(error.message.split(':').pop(), error.code.split('/').pop());
		}
	}

	async resendEmail() {
		try {
			await this.authService.sendEmailVerification()
		} catch (error) {
			console.log('Can not resend email verification')
		}
	}

	closeModal() {
		this.basicModal.hide()
		this.router.navigate(['/signin'])
	}
}
