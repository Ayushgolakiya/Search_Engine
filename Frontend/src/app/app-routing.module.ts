import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ChatComponent } from './chat/chat.component';
import { SigninComponent } from './signin/signin.component'; // Add this line
import { SearchComponent } from './search/search.component';
const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'auth', component: AuthenticationComponent },
  { path: 'chat/:uId', component: ChatComponent }, // Modified this line
  { path: 'signin', component: SigninComponent }, 
  {path :'search/:uId',component:SearchComponent }// Add this line
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }