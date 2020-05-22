import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { User } from 'src/app/models/User'
import { UserService } from 'src/app/services/user.service'

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

	email: string
	password: string

	constructor(public router: Router, private userService: UserService) {
		if (this.userService.user)
			this.router.navigate(['/home'])
	}

	ngOnInit(): void {
	}

	signin(): void {
		console.log('sign in', this.email, this.password)
	}
}
