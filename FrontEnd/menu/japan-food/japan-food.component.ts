import { Component } from '@angular/core';
import { Food } from 'src/app/_model/food';
import { OrderService } from 'src/app/_service/order.service';
import { Router } from '@angular/router';
import {AngularFireStorage} from '@angular/fire/compat/storage'
@Component({
  selector: 'app-japan-food',
  templateUrl: './japan-food.component.html',
  styleUrls: ['./japan-food.component.css']
})
export class JapanFoodComponent {
  food : Food = new Food();
  url2 = ""
  url1 = ""
  image: any = File;
  constructor(private router: Router, private service: OrderService, private storage: AngularFireStorage){}

  async onSubmit(){
    const path = `yt/${this.image.name}`
    const uploadTask =await this.storage.upload(path, this.image)
    const url = await uploadTask.ref.getDownloadURL()
    console.log(url)
    this.url1 = url
    this.food.foodImage = this.url1
    console.log(this.food)
    

    if(this.food.foodImage){
      console.log(this.food.foodImage)
      this.service.createFood(this.food).subscribe(res=>{
        console.log(res);
    },err => console.log(err))
    }

    this.router.navigate(['homefood'])
  }

  onSelecteFile(e:any){
    if(e.target.files){
      this.image = e.target.files[0];
      
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (even: any) => {
        this.url2 = even.target.result;
      }
    }
  }
}
