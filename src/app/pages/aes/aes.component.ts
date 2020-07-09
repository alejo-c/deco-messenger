import { Component } from '@angular/core'

import { ToastrService } from 'ngx-toastr'

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
		private fileService: FilesService,
		private toastr: ToastrService
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

	toggleHover(event: boolean, area: string) {
		if (area == 'encrypt')
			this.isHoveringEncrypt = event
		else
			this.isHoveringDecrypt = event
	}

	async onDrop(files: FileList, area: string) {
		if (area == 'encrypt')
			this.plainText = await this.fileService.text(files.item(0))
		else
			this.encryptText = await this.fileService.text(files.item(0))
	}

	clear(area: string) {
		if (area == 'encrypt')
			this.plainText = this.encPassword = this.conversionEncryptOutput = ''
		else
			this.encryptText = this.decPassword = this.conversionDecryptOutput = ''
	}

	download(area: string) {
		if (area == 'encrypt')
			this.fileService.saveURL(
				window.URL.createObjectURL(new Blob(
					[this.conversionEncryptOutput]
					, { type: 'application/octet-stream' }
				))
				, 'encrypted.txt'
			)
		else
			this.fileService.saveURL(
				window.URL.createObjectURL(new Blob(
					[this.conversionDecryptOutput]
					, { type: 'application/octet-stream' }
				))
				, 'decrypted.txt'
			)
	}

	copy(area: string) {
		if (area == 'encrypt')
			this.toastr.info('Encrypted text copied to clipboard')
		else
			this.toastr.info('Decrypted text copied to clipboard')
	}
}
