import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MDBBootstrapModule } from 'angular-bootstrap-md'
import { ComponentsModule } from '../components/components.module'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { SigninComponent } from './signin/signin.component'
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component'

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
