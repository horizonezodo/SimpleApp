import { Component } from '@angular/core';
import { faEnvelope, faEye, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../_service/login.service';
import { Register } from '../_model/register';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  faUserIcon = faUser;
  faLockIcon = faEye;
  faMailIcon = faEnvelope;
  faPhoneIcon = faPhone;
  response!: string;
  repassword!:string;
  register:Register = new Register();

  constructor(private router: Router, private service: LoginService){}
  registerBtn(){
    if(this.repassword === this.register.password){
      this.service.signin(this.register).subscribe(res => {
        this.router.navigate(['/login']);
      },err => {
        this.response = err;
      })
    }
    else{
      this.response = "Your password invalid";
    }
  }
  goToLoginPage(){
    this.router.navigate(['/login']);
  }
}
