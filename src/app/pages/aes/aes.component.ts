import { Component } from '@angular/core'

import { EncryptService } from '@services/encrypt.service'
import { FilesService } from '@services/files.service'

@Component({
	selector: 'app-aes',
	templateUrl: './aes.component.html',
	styleUrls: ['./aes.component.scss']
})
export class AesComponent {

	public plainText: string;
	public encryptText: string;
	public encPassword: string;
	public decPassword: string;
	public conversionEncryptOutput: string;
	public conversionDecryptOutput: string;
	public isHoveringEncrypt: boolean
	public isHoveringDecrypt: boolean

	constructor(
		private encryptService: EncryptService,
		private fileService: FilesService
	) { }

	encrypt() {
		this.conversionEncryptOutput = this.encryptService.encrypt(
			this.plainText,
			this.encPassword
		)
	}

	decrypt() {
		this.conversionDecryptOutput = this.encryptService.decrypt(
			this.encryptText,
			this.decPassword
		)
	}

	toggleHoverEncrypt(event: boolean) {
		this.isHoveringEncrypt = event
	}

	async onDropEncrypt(files: FileList) {
		let file = files.item(0)
		this.plainText = await this.fileService.text(file)
	}

	clearEncrypt() {
		this.plainText = ''
		this.encPassword = ''
		this.conversionEncryptOutput = ''
	}

	downloadEncrypt() {
		const blob = new Blob(
			[this.conversionEncryptOutput]
			, { type: 'application/octet-stream' }
		)
		this.fileService.saveURL(
			window.URL.createObjectURL(blob)
			, 'encrypted.txt'
		)
	}

	toggleHoverDecrypt(event: boolean) {
		this.isHoveringDecrypt = event
	}

	async onDropDecrypt(files: FileList) {
		let file = files.item(0)
		this.encryptText = await this.fileService.text(file)
	}

	clearDecrypt() {
		this.encryptText = ''
		this.decPassword = ''
		this.conversionDecryptOutput = ''
	}

	downloadDecrypt() {
		const blob = new Blob(
			[this.conversionDecryptOutput]
			, { type: 'application/octet-stream' }
		)
		this.fileService.saveURL(
			window.URL.createObjectURL(blob)
			, 'decrypted.txt'
		)
	}
}
