import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

buttonId: any;
listOfPendingDealer: any;

gotodashboard() {
this.router.navigate(['/dashboard']);
}

constructor(private router:Router ,private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
   this. isExpanded = false;
  }

  isExpanded = false;
  applycssClass=false;
  onMouseEnter(id:number) {
    this.buttonId=id;
  }

  onMouseLeave(id:number) {
    this.buttonId=id;
  }
 
  findByName($event: KeyboardEvent) {

  }
  showDealer(_t21: any) {
  }


//   const hamBurger = document.querySelector(".toggle-btn");

//   hamBurger.addEventListener("click", function () {
//   document.querySelector("#sidebar").classList.toggle("expand");
  
// });

  sidebarExpanded: boolean = false;
  sidebarHovered: boolean = false;

  toggleSidebar() {
    this.isExpanded=!this.isExpanded;
    this.sidebarExpanded = !this.sidebarExpanded;
    this.sidebarHovered = !this.sidebarHovered
  }

  expandSidebar() {
    if (!this.sidebarExpanded) {
      this.sidebarHovered = true;
    }
  }

  collapseSidebar() {
    if (!this.sidebarExpanded) {
      this.sidebarHovered = false;
    }
  }
}
