import { Component, OnInit, Input } from '@angular/core'
import { AngularFireStorage } from '@angular/fire/storage'

import { PlainTextFile } from '@models/PlainTextFile'
import { FirebaseApp } from '@angular/fire'

@Component({
	selector: 'app-file',
	templateUrl: './file.component.html',
	styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

	@Input() file: PlainTextFile = {
		URL: 'https://firebasestorage.googleapis.com/v0/b/deco-messenger.appspot.com/o/files%2F1.txt?alt=media&token=8aa32114-56ea-43ea-8e58-930e881e9674'
		, datetime: '2020-07-03T02:35:58.851Z',
		ownerUid: 'NeSzW0PYm0OX1Sg5tSLNbcZNiKj1',
		name: '1.txt',
		type: 'file'
	}
	public httpsReference
	text = ''

	constructor(
		private storage: AngularFireStorage,
		private firebase: FirebaseApp
	) { }

	ngOnInit(): void {
	}

}
