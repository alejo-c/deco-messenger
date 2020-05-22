import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MDBBootstrapModule } from 'angular-bootstrap-md'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { NavbarComponent } from './navbar/navbar.component'

@NgModule({
	declarations: [NavbarComponent],
	imports: [
		CommonModule,
		MDBBootstrapModule.forRoot(),
		RouterModule,
		FormsModule
	],
	exports: [
		NavbarComponent
	]
})
export class ComponentsModule { }
