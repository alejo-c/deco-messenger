import { Component } from '@angular/core'

import { EncryptService } from '@services/encrypt.service'

@Component({
	selector: 'app-aes',
	templateUrl: './aes.component.html',
	styleUrls: ['./aes.component.scss']
})
export class AesComponent {

	plainText: string;
	encryptText: string;
	encPassword: string;
	decPassword: string;
	conversionEncryptOutput: string;
	conversionDecryptOutput: string;

	constructor(private encryptService: EncryptService) {
	}

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
}
