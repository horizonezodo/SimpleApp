import { Component } from '@angular/core';
import { OrderService } from 'src/app/_service/order.service';
import { Food } from 'src/app/_model/food';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-food',
  templateUrl: './home-food.component.html',
  styleUrls: ['./home-food.component.css']
})
export class HomeFoodComponent {
  foods!:Food[];
  role:string | null;
  constructor(private router: Router, private service: OrderService){
    this.role = localStorage.getItem('roles');
    if(this.role === 'USER_ROLE'|| this.role === null){
      this.service.getAllFoodsUser().subscribe(res=>{
        this.foods = res
      },err =>{ console.log(err)})
    }else{
      this.service.getAllFoodsAdmin().subscribe(res=>{
        this.foods =  res
      }, err => console.log(err))
    }

    
  }



  updateFood(id:number){
      this.router.navigate(['korean', id])
  }
  showFood(id:number){
    this.router.navigate(['details', id])
  }

  DisableFood(id:number){
      this.service.unactiveFood(id).subscribe(res => {
        console.log(res)
      }, err => console.log(err))
  }

  EnableFood(id:number) {
    this.service.activeFood(id).subscribe(res => {
      console.log(res)
    }, err => console.log(err))
  }
  createFood(){
    this.router.navigate(['japan']);
  }
}
