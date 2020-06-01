import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { ToastrService } from 'ngx-toastr'

import { AuthService } from 'src/app/services/auth.service'
import { Observable } from 'rxjs'
import { User } from 'firebase'

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

	public user$: Observable<User> = this.authService.afAuth.user

	constructor(public authService: AuthService, public router: Router, private toastr: ToastrService) { }

	async signout() {
		this.authService.signout()
		console.log('sign out')
		this.router.navigate(['/home'])
		this.toastr.success('Sign out successfully!')
	}
}
