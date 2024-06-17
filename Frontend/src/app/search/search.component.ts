import { Component, OnInit } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
  import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  

 
    
    companyName: string='';
    uId: string='';
  
    constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
      console.log('Constructor called');
      // Subscribe to router events
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.initializeComponent();
      });
    }
  
    ngOnInit() {
      this.initializeComponent();
    }
  
    initializeComponent() {
      console.log('Component initialized');
      const uIdFromRoute = this.route.snapshot.paramMap.get('uId');
      if (uIdFromRoute === null) {
        console.log('uId not found in route parameters');
        this.uId = '';
      } else {
        this.uId = uIdFromRoute;
      }
    }
  searchCompany() {
    console.log('searchCompany method called');
    this.http.post<any>('http://localhost:3000/search', { companyName: this.companyName, uId: this.uId })
      .subscribe(
        (data) => {
          console.log('Response received:', data);
          if (data.error) {
            // Handle error
            console.error('Server returned an error:', data.error);
            // You could also show a user-friendly error message here
          } else {
            // If the search was successful, redirect to the company's website
            window.location.href = data.url;
          }
        },
        (error) => {
          console.log('Error:', error);
          // This is where you handle errors that occur during the HTTP request
          // For example, network errors or server not responding
          console.error('An error occurred while making the HTTP request:', error);
          // You could also show a user-friendly error message here
        }
      );
  }
  }

