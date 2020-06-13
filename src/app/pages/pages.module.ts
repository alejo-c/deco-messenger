import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MDBBootstrapModule } from 'angular-bootstrap-md'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { ComponentsModule } from '@components/components.module'

import { HomeComponent } from '@pages/home/home.component'
import { SigninComponent } from '@pages/signin/signin.component'
import { SignupComponent } from '@pages/signup/signup.component'
import { ProfileComponent } from '@pages/profile/profile.component'

@NgModule({
	declarations: [HomeComponent, SigninComponent, SignupComponent, ProfileComponent],
	imports: [
		CommonModule,
		MDBBootstrapModule.forRoot(),
		ComponentsModule,
		FormsModule,
		RouterModule
	]
})
export class PagesModule { }
