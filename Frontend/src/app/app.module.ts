import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ChatComponent } from './chat/chat.component';
import { SigninComponent } from './signin/signin.component';
import { SearchComponent } from './search/search.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
        AuthenticationComponent,
        ChatComponent,
        SigninComponent,
        SearchComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        SocketIoModule.forRoot(config)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }