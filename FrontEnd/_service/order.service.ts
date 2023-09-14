import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food } from '../_model/food';
import { Observable } from 'rxjs';
import { SearchFood } from '../_model/search-food';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = "http://localhost:8888"

  constructor(private http: HttpClient) { }

  getAllFoodsUser(): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.url}/all-food`);
  }

  getAllFoodsAdmin(): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.url}/admin-all-food`);
  }

  getAFoodUser(id:number): Observable<Food> {
    return this.http.get<Food>(`${this.url}/food/${id}`);
  }

  getAFoodAdmin(id:number): Observable<Food>{
    return this.http.get<Food>(`${this.url}/admin-get-food/${id}`);
  }

  createFood(food:Food) : Observable<object>{
    return this.http.post(`${this.url}/create-food`, food);
  }

  updateFood(food:Food, id:number): Observable<object>{
    return this.http.put(`${this.url}/update-food/${id}`,food);
  }

  searchFood(key: SearchFood): Observable<object>{
    return this.http.post(`${this.url}/search-food`,key);
  }

  activeFood(id:number): Observable<object>{
    return this.http.put(`${this.url}/active-food/${id}`,'');
  }

  unactiveFood(id:number): Observable<object>{
    return this.http.put(`${this.url}/deactive-food/${id}`,'');
  }

}
