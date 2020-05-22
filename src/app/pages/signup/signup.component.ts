import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

	username: string
	email: string
	password: string

	constructor(private router: Router, private userService: UserService) {
		if (this.userService.user)
			this.router.navigate(['/home'])
	}

	ngOnInit(): void {
	}

	signup(): void {
		console.log('sign up', this.username, this.email, this.password)
	}
}
