import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApicardsService } from '../services/apicards.service';

@Component({
  selector: 'app-api-cards',
  templateUrl: './api-cards.component.html',
  styleUrl: './api-cards.component.css'
})
export class ApiCardsComponent {

  constructor(private router:Router,private apiCardsService:ApicardsService){

  }
  apiCards:any;

  ngOnInit(){
    sessionStorage.clear();
    this.apiCardsService.getCards().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.apiCards=res.cards;
      }
    })
  }
  goToApiPage(id:any){
    this.apiCardsService.setData(id);
    sessionStorage.setItem('id',id)
    this.router.navigate([`dashboard`],{state:{id:id}})
  }
  createJson(){
this.router.navigate(['dashboard'])
  }
}
