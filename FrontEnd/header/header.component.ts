import { Component } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faBowlFood } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../_service/login.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  homeIcon = faHome;
  foodIcon = faBowlFood;
  shoppingCartIcon = faShoppingCart;
  userIcon = faUser;
  searchIcon = faSearch;
  rightForm = "-110%"
  count = 0;
  rightLogin= "-110%"
  countLG= 0;
  constructor(private service: LoginService){
    this.showForm();
  }

  showForm(){
    this.count += 1;
    if(this.rightLogin==="2rem") this.rightLogin="-110%"
    console.log(this.count);
    if (this.count%2 ===0){
      this.rightForm = "2rem";
    }else{
      this.rightForm = "-110%";
    }
  }

  showLogin(){
    this.countLG += 1;
    if(this.rightForm==="2rem") this.rightForm="-110%"
    console.log(this.count);
    if (this.countLG%2 ===0){
      this.rightLogin = "2rem";
    }else{
      this.rightLogin = "-110%";
    } 
  }

  logout(){
    this.service.logout().subscribe(res =>{
      console.log(res);
      localStorage.removeItem('roles')
    },err => console.log(err));
  }
}
