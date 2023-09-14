import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor(private router: Router) {}
  gotoKoreanFood(){
    this.router.navigate(['homefood']);
  }
  gotoJapaFood(){
    this.router.navigate(['homefood']);
  }
  gotoHomeFood(){
    this.router.navigate(['homefood']);
  }
}
