import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MDBBootstrapModule } from 'angular-bootstrap-md'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { ScrollingModule } from '@angular/cdk/scrolling'

import { NavbarComponent } from '@components/navbar/navbar.component'
import { ChatListComponent } from '@components/chats/chat-list/chat-list.component'
import { ChatComponent } from '@components/chats/chat/chat.component'
import { ChatPreviewComponent } from '@components/chats/chat-preview/chat-preview.component'

@NgModule({
	declarations: [
		NavbarComponent,
		ChatListComponent,
		ChatComponent,
		ChatPreviewComponent
	],
	imports: [
		CommonModule,
		MDBBootstrapModule.forRoot(),
		RouterModule,
		FormsModule,
		ScrollingModule
	],
	exports: [
		NavbarComponent,
		ChatListComponent,
		ChatComponent
	]
})
export class ComponentsModule { }
