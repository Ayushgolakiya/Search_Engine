import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  showLogin = true; // Initially show login form

  constructor(private http: HttpClient, private router: Router) { }

  

  
  message = '';
  onLogin(loginForm: NgForm) {
    const emailOrUserId = loginForm.value.emailOrUserId;
    const password = loginForm.value.password;
    console.log(emailOrUserId, password);   
    this.login(emailOrUserId, password);
  }

  login(emailOrUserId: string, password: string) {
    this.http.post('http://localhost:3000/login', { emailOrUserId, password })
      .subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          console.log('Login successful');
          this.message='Login successful';
          // Assuming you have received uId from the backend in a variable named uId
          this.router.navigate(['/search', response.uId]);
        } else {
          console.log('Login failed');
          this.message='Login failed';
        }
      });
  }
}
