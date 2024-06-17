// landing.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {}

  navigateToAuth(): void {
    this.router.navigate(['/auth']); // Navigate to the Authentication Page
  }
  formData: any = {};

  submitForm() {
    // Here you can handle form submission logic, such as sending data to your backend
    console.log('Form submitted with data:', this.formData);
  }
}

