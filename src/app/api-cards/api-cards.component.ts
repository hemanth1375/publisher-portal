import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-api-cards',
  templateUrl: './api-cards.component.html',
  styleUrl: './api-cards.component.css'
})
export class ApiCardsComponent {

  constructor(private router:Router){

  }
  createJson(){
this.router.navigate(['/dashboard'])
  }
}
