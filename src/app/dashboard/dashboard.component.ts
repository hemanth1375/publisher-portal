import { Component } from '@angular/core';
import { ApicardsService } from '../services/apicards.service';
import { switchMap, takeUntil } from 'rxjs';
import { ApiPageService } from '../services/api-page.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  apiData:any;
constructor(private apiCardsService:ApicardsService,private apiPageService:ApiPageService,private sharedService:SharedDataService){

}
endPointData:any;
  ngOnInit(){
    
    // this.apiCardsService.getData$().subscribe(data => {
    //   this.apiData = data;
    //   console.log(this.apiData);
    // });

    this.apiCardsService.getData$().pipe(
      switchMap(data => {
        console.log(data);
        
        this.apiData = data;
        return this.apiPageService.getEndpoints(data);
      })
    ).subscribe(secondData => {
      console.log(secondData);
      
      this.sharedService.setEntireJsonData(secondData)
      this.endPointData = secondData;
      // if('endpoints' in secondData){
        
       
      // }else{
      //   this.endPointData={}
      // }
      
      console.log('Second API Data:', secondData);
    });
    
  }
}
