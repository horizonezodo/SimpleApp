import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MenuComponent } from './menu/menu.component';
import { KoreanFoodComponent } from './menu/korean-food/korean-food.component';
import { JapanFoodComponent } from './menu/japan-food/japan-food.component';
import { HomeFoodComponent } from './menu/home-food/home-food.component';
import { FoodDetailComponent } from './menu/food-detail/food-detail.component';
const routes: Routes = [
  {path : 'login', component: LoginComponent},
  {path : 'register', component: RegisterComponent},
  {path : 'dashboard', component: DashboardComponent},
  {path : 'about', component: AboutComponent},
  {path : 'contact', component: ContactComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path: 'menu', component: MenuComponent},
  {path : 'korean/:id', component: KoreanFoodComponent},
  {path: 'japan', component:JapanFoodComponent},
  {path: 'homefood', component: HomeFoodComponent},
  {path: 'details/:id', component: FoodDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
