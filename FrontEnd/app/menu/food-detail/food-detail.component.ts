import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/_model/food';
import { OrderService } from 'src/app/_service/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit{
  id!:number;
  food!:Food;
  url2 = "";
  
  constructor(private storage: AngularFireStorage, private router: Router, private service: OrderService , private route: ActivatedRoute) {
    
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.food = new Food();
    this.service.getAFoodUser(this.id).subscribe(res =>{
        this.food = res
        this.url2 =res.foodImage
    })
  }

  onSubmit(){
    this.router.navigate(['homefood']);
  }


}
