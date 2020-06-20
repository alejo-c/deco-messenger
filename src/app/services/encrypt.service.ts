import { Injectable } from '@angular/core'

import { AES, enc } from 'crypto-js'

@Injectable({
	providedIn: 'root'
})
export class EncryptService {

	encrypt(plainText: string, password: string): string {
		return AES.encrypt(
			plainText.trim(),
			password.trim()
		).toString()
	}

	decrypt(encryptText: string, password: string) {
		return AES.decrypt(
			encryptText.trim(),
			password.trim()
		).toString(enc.Utf8)
	}
}
