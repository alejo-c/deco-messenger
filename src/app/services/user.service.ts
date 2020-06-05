import { Injectable } from '@angular/core'

import { AngularFirestore, DocumentReference, DocumentChangeAction } from '@angular/fire/firestore'
import { User } from '../models/User'

@Injectable({
	providedIn: 'root'
})
export class UserService {

	public user: User

	constructor(private firestore: AngularFirestore) { }

	createUser(user: User): Promise<DocumentReference> {
		return this.firestore.collection('users').add(user)
	}

	readUsers() {
		return this.firestore.collection('users').snapshotChanges()
	}

	updateUser(user: User): Promise<void> {
		delete user.uid
		return this.firestore.doc('users/' + user.uid).update(user)
	}

	deteteUser(userUID: string): Promise<void> {
		return this.firestore.doc('users/' + userUID).delete()
	}
}
