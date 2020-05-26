import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { User } from 'src/app/models/User';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	user: User

	constructor(private userService: UserService) {
		this.user = this.userService.user
	}

	ngOnInit(): void {
	}

}
