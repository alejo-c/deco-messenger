import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ReadFileService {

	readFileContent(file: File): Promise<string> {
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
}
