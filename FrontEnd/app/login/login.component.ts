import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../_service/login.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Login } from '../_model/login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  faUserIcon = faUser;
  faLockIcon = faEye;
  login:Login = new Login();
  response!:string;

  constructor(private router: Router, private service:LoginService){}

  OnInit(){}

  loginBtn(){
    this.service.sigup(this.login).subscribe(res =>{
      if(res.token){
        const jwtToken = res.token;
        localStorage.setItem('JWT',jwtToken);
        this.router.navigate(['/dashboard']);
        localStorage.setItem('roles', res.roles);
      }
    },err => this.response = err);
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }

}
