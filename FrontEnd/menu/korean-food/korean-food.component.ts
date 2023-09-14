import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/_model/food';
import { OrderService } from 'src/app/_service/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-korean-food',
  templateUrl: './korean-food.component.html',
  styleUrls: ['./korean-food.component.css']
})
export class KoreanFoodComponent implements OnInit{
  id!:number;
  food!:Food;
  url2 = ""
  url1 = ""
  image: any = File;
  constructor(private storage: AngularFireStorage, private router: Router, private service: OrderService , private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.food = new Food();
    this.service.getAFoodAdmin(this.id).subscribe(res =>{
      this.food = res;
    },err => console.log(err))
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

  async onSubmit(){
    const path = `yt/${this.image.name}`
    const uploadTask =await this.storage.upload(path, this.image)
    const url = await uploadTask.ref.getDownloadURL()
    console.log(url)
    this.url1 = url
    this.food.foodImage = this.url1
    console.log(this.food)

    this.service.updateFood(this.food, this.id).subscribe(res =>{
      console.log(res)
    },err => console.log(err))

    this.router.navigate(['homefood'])
  }
}
