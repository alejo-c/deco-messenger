import { Injectable } from '@angular/core'

import { AngularFirestore, DocumentReference } from '@angular/fire/firestore'
import { User } from '../models/User'

@Injectable({
	providedIn: 'root'
})
export class UserService {

	public user: User

	constructor(private firestore: AngularFirestore) { }

	createUser(user: User): Promise<void> {
		return this.firestore.collection('users').doc(user.uid).set(user, { merge: true })
	}

	readUsers() {
		return this.firestore.collection('users').snapshotChanges()
	}

	readUser(userUid: string) {
		return this.firestore.doc('users/' + userUid).snapshotChanges()
	}

	updateUser(user: User): Promise<void> {
		return this.firestore.doc('users/' + user.uid).update(user)
	}

	deteteUser(userUid: string): Promise<void> {
		return this.firestore.doc('users/' + userUid).delete()
	}
}
