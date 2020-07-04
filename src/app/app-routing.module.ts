import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from '@pages/home/home.component'
import { SigninComponent } from '@pages/signin/signin.component'
import { SignupComponent } from '@pages/signup/signup.component'
import { ProfileComponent } from '@pages/profile/profile.component'
import { AesComponent } from '@pages/aes/aes.component'

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'signin', component: SigninComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'aes', component: AesComponent },
	{ path: '**', pathMatch: 'full', redirectTo: '/home' }
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
