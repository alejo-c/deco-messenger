import { Component, ViewChild } from '@angular/core'
import { Router } from '@angular/router'

import { ToastrService } from 'ngx-toastr'

import { AuthService } from 'src/app/services/auth.service'
import { Observable } from 'rxjs'
import { User } from 'firebase'
import { NavbarComponent as Navbar } from 'angular-bootstrap-md'

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

	@ViewChild('navbar') private navbar: Navbar;

	public user$: Observable<User> = this.authService.afAuth.user

	constructor(
		public authService: AuthService,
		public router: Router,
		private toastr: ToastrService
	) { }

	toggle(): void {
		if (this.navbar.shown)
			this.navbar.toggle();
	}

	async signout() {
		try {
			this.authService.signout()
			console.log('sign out')
			this.toastr.success('Sign out successfully!')
			this.toggle()
		} catch (error) {
			this.toastr.error(error.message.split(':').pop(), error.code.split('/').pop());
		}
	}
}
