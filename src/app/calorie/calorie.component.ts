import { Component, OnInit } from '@angular/core';
import { Calorie } from './calorie.model';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'calorie',
  templateUrl: './calorie.component.html',
  styleUrls: ['./calorie.component.css']
})
export class CalorieComponent implements OnInit {

  calories: Array<Calorie> = [];
  calorieParams: string = '';
  constructor(private http: HttpClient) { }


 async ngOnInit() {
  this.loadItems();
 }

 async loadItems(){
  const savedCalories = this.getItemsFromLocalStorage('calories');
  if(savedCalories && savedCalories.length > 0) {
    this.calories = savedCalories;
  } else {
  this.calories = await this.loadItemsFromFile();
}
 }

  async loadItemsFromFile(){
    const data: any = await this.http.get('assets/calorie.json').toPromise();
    console.log('from LoadItemsFromFile data: ' , data);
    return data;
  }

  addItem(){
    this.calories.unshift(new Calorie({}));
  }

  deleteItem(index: number){
    this.calories.splice(index, 1);
    this.saveItemsToLocalStorage(this.calories);
  }

  saveItem(calorie: any){
    calorie.editing = false;

  }

  saveItemsToLocalStorage(calories: Array<Calorie>) {
    const savedCalories = localStorage.setItem('calories', JSON.stringify(calories));
    return savedCalories;
  }

  getItemsFromLocalStorage(key: string) {
    const savedCalories = JSON.parse(localStorage.getItem(key));
    return savedCalories;
  }

  searchItem(params: string) {
    console.log('from searchItem params: ', params);
    this.calories = this.calories.filter((item: Calorie) => {
      const fullName = item.food;
      console.log('full name is --->', fullName);
      console.log('items--->', item.food);
      if(params === fullName || params === item.food) {
        return true;
      } else {
        return false;
      }
    });
  }
}
