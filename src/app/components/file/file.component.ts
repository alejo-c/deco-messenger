import { Component, Input } from '@angular/core'

import { Message } from '@models/Message'

import { HttpClient } from '@angular/common/http'
import { saveAs } from 'file-saver'

@Component({
	selector: 'app-file',
	templateUrl: './file.component.html',
	styleUrls: ['./file.component.scss']
})
export class FileComponent {

	@Input() file: Message

	constructor(private http: HttpClient) { }

	download() {
		this.http.get(this.file.URL, { responseType: 'blob' })
			.subscribe(res => {
				saveAs(res, this.file.name)
			})
	}
}
