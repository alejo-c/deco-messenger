import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { MDBBootstrapModule } from 'angular-bootstrap-md'

import { AppComponent } from './app.component'
import { ComponentsModule } from '@components/components.module'
import { PagesModule } from '@pages/pages.module'

import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireDatabaseModule } from "@angular/fire/database"
import { environment } from 'src/environments/environment'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'

import { HttpClientModule } from '@angular/common/http'

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MDBBootstrapModule.forRoot(),
		ComponentsModule,
		PagesModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFireAuthModule,
		AngularFireDatabaseModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot(),
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
