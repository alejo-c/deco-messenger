import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MDBBootstrapModule } from 'angular-bootstrap-md'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { NavbarComponent } from './navbar/navbar.component'
import { ChatListComponent } from './chats/chat-list/chat-list.component'
import { ChatComponent } from './chats/chat/chat.component'
import { ChatPreviewComponent } from './chats/chat-preview/chat-preview.component'

@NgModule({
	declarations: [NavbarComponent, ChatListComponent, ChatComponent, ChatPreviewComponent],
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
