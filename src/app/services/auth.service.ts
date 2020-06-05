import { Injectable } from '@angular/core'

import { auth } from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(public afAuth: AngularFireAuth) { }

	async signin(email: string, password: string) {
		return await this.afAuth.signInWithEmailAndPassword(email, password)
	}

	async signinGoogle() {
		return await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
	}

	async signup(displayName: string, email: string, password: string) {
		const user = await this.afAuth.createUserWithEmailAndPassword(email, password)
		user.user.updateProfile({
			displayName: displayName, photoURL: `https://api.adorable.io/avatars/0/${displayName}@adorable.io.png`
		}).then(function () {
			console.log('updated:', displayName)
		}, function (error) {
			console.log('error:', error)
		})
		this.sendEmailVerification()
		this.signout()
		return user
	}

	async signupGoogle() {
		return await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
	}

	async signout() {
		return await this.afAuth.signOut()
	}

	async sendEmailVerification(): Promise<void> {
		return (await this.afAuth.currentUser).sendEmailVerification()
	}
}
