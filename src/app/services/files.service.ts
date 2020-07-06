import { Injectable } from '@angular/core'

import { HttpClient } from '@angular/common/http'
import { saveAs } from 'file-saver'

@Injectable({
	providedIn: 'root'
})
export class FilesService {

	constructor(private http: HttpClient) { }

	text(file: File): Promise<string> {
		return new Promise<string>(resolve => {
			if (!file)
				resolve('')
			const reader = new FileReader()
			reader.onload = (e) => {
				const text = reader.result.toString()
				resolve(text)
			}
			reader.readAsText(file)
		})
	}

	saveURL(URL: string, fileName: string) {
		this.http.get(URL, { responseType: 'blob' })
			.subscribe(res => { saveAs(res, fileName) })
	}

	saveText(text: string, fileName: string) {
		const blob = new Blob(
			[text], { type: 'application/octet-stream' }
		)
		this.saveURL(
			window.URL.createObjectURL(blob)
			, fileName
		)
	}
}
