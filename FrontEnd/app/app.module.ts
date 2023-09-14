import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { SlideComponent } from './slide/slide.component';
import { HeaderComponent } from './header/header.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { InterceptorService } from './_helpers/interceptor.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BrowserAnimationsModule }  from "@angular/platform-browser/animations";
import { register } from 'swiper/element/bundle';
import { MenuComponent } from './menu/menu.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.development';
import { KoreanFoodComponent } from './menu/korean-food/korean-food.component';
import { JapanFoodComponent } from './menu/japan-food/japan-food.component';
import { HomeFoodComponent } from './menu/home-food/home-food.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FoodDetailComponent } from './menu/food-detail/food-detail.component';
register();
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    SlideComponent,
    DashboardComponent,
    AboutComponent,
    ContactComponent,
    MenuComponent,
    KoreanFoodComponent,
    JapanFoodComponent,
    HomeFoodComponent,
    FoodDetailComponent,
  ],    
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass:InterceptorService,
    multi:true
  }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
