import { Injectable } from '@angular/core'

import { auth } from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth'
import { ToastrService } from 'ngx-toastr'

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(public afAuth: AngularFireAuth, private toastr: ToastrService) { }

	async signin(email: string, password: string) {
		try {
			return await this.afAuth.signInWithEmailAndPassword(email, password)
		} catch (error) {
			this.toastr.error(error.message.split(':').pop(), error.code.split('/').pop())
		}
	}

	async signinGoogle() {
		try {
			const user = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
			this.toastr.success('Sign in successfully!')
			return user
		} catch (error) {
			this.toastr.error(error.message.split(':').pop(), error.code.split('/').pop());
		}
	}

	async signup(email: string, password: string) {
		try {
			const user = await this.afAuth.createUserWithEmailAndPassword(email, password)
			this.signout()
			this.sendEmailVerification()
			return user
		} catch (error) {
			this.toastr.error(error.message.split(':').pop(), error.code.split('/').pop());
		}
	}

	async signupGoogle() {
		try {
			const user = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
			this.toastr.success('Sign up successfully!')
			return user
		} catch (error) {
			this.toastr.error(error.message.split(':').pop(), error.code.split('/').pop());
		}
	}

	async signout() {
		try {
			return await this.afAuth.signOut()
		} catch (error) {
			this.toastr.error(error.message.split(':').pop(), error.code.split('/').pop());
		}
	}

	async sendEmailVerification(): Promise<void> {
		return (await this.afAuth.currentUser).sendEmailVerification()
	}
}
