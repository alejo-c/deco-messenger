import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MDBBootstrapModule } from 'angular-bootstrap-md'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { NavbarComponent } from './navbar/navbar.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatComponent } from './chat/chat.component'

@NgModule({
	declarations: [NavbarComponent, ChatListComponent, ChatComponent],
	imports: [
		CommonModule,
		MDBBootstrapModule.forRoot(),
		RouterModule,
		FormsModule
	],
	exports: [
		NavbarComponent,
		ChatListComponent,
		ChatComponent
	]
})
export class ComponentsModule { }
