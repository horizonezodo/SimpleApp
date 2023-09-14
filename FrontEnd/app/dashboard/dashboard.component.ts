import { Component } from '@angular/core';
import { SlideInterface } from '../_model/slide-interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public slides = [
      {url: '/assets/Combo.jpg', title: 'combo food'},
      {url: '/assets/SeaFood.jpg', title: 'sea food'},
      {url: '/assets/ShuShi.jpg', title: 'shushi'},
      {url: '/assets/Steak.jpg', title: 'beef steak'},
      {url: '/assets/nomalFood.jpg', title: 'korean combo food'},
      {url: '/assets/AnhPho.jpg', title: 'Pho So'}
  ];
}
