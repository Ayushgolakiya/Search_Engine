import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  constructor(private http: HttpClient, private router: Router) { }
  onSubmit(signupForm: NgForm) {
    const password = signupForm.value.password;
    const confirmPassword = signupForm.value.confirmPassword;

    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      this.message = 'Passwords do not match';
      return;
    }

    if (password.length < 8) {
      console.log('Password must be at least 8 characters');
      this.message = 'Password must be at least 8 characters';
      return;
    }

    if (!/\d/.test(password)) {
      console.log('Password must contain at least one number');
      this.message = 'Password must contain at least one number';
      return;
    }

    const email = signupForm.value.email;
    const userId = signupForm.value.userId;

    this.signup(email, userId, password);
  }
  message = ''; // Add this line

  signup(email: string, userId: string, password: string) {
    this.http.post('http://localhost:3000/signup', { email, userId, password })
      .subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          console.log('Signup successful');
          this.message = 'Signup successful';
          this.router.navigate(['/search', response.uId]);
        } else {
          if (response.message === 'User already exists') {
            console.log('Signup failed: User already exists');
            this.message = 'Signup failed: User already exists';
          } else if (response.message === 'Passwords do not match') { // Add this line
            console.log('Signup failed: Passwords do not match'); // Add this line
            this.message = 'Signup failed: Passwords do not match'; // Add this line
          } else {
            console.log('Signup failed');
            this.message = 'Signup failed';
          }
        }
      });
  }
}
