import { Component, Input } from '@angular/core'

import { ToastrService } from 'ngx-toastr'

import { Message } from '@models/Message'

import { FilesService } from '@services/files.service'

@Component({
	selector: 'app-file',
	templateUrl: './file.component.html',
	styleUrls: ['./file.component.scss']
})
export class FileComponent {

	@Input() file: Message

	constructor(
		private fileService: FilesService,
		private toastr: ToastrService
	) { }

	download() {
		this.fileService.saveURL(this.file.URL, this.file.name)
		this.toastr.info('Use Chat ID to dencrypt the file text', 'Dencrypt file')
	}
}
