import { Component, OnInit } from '@angular/core';
import { Calorie } from './calorie.model';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../localStorageService';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../login/login.component';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';


@Component({
  selector: 'app-calorie',
  templateUrl: './calorie.component.html',
  styleUrls: ['./calorie.component.css']
})
export class CalorieComponent implements OnInit {

  calories: Array<Calorie> = [];
  calorieParams: '';
  localStorageService: LocalStorageService<Calorie>
  currentUser: IUser;
  confirmMessage: string;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    
  ) {
    this.localStorageService = new LocalStorageService('calories');

  }


  async ngOnInit() {
    const currentUser = this.localStorageService.getItemsFromLocalStorage('user');
    if (currentUser == null) {
      this.router.navigate(['']);
    }



    this.loadItems();
    this.activatedRoute.params.subscribe((data: IUser) => {
      this.currentUser = data;
    });
  }

  async loadItems() {
    const savedCalories = this.getItemsFromLocalStorage('calories');
    console.log(savedCalories);
    if (savedCalories && savedCalories.length > 0) {
      this.calories = savedCalories;
    } else {
      this.calories = await this.loadItemsFromFile();
    }
  }

  async loadItemsFromFile() {
    const data: any = await this.http.get('assets/calorie.json').toPromise();
    console.log('from LoadItemsFromFile data: ', data);
    return data;
  }

  calculation() {
    const total = this.calories.reduce((result, calorie) => {
      result += calorie.calories * calorie.quantity;

      return result;
    }, 0);
    return {
      total,
    };
  }

  calculate() {
    const toCalculate = this.calculation();
    this.confirmMessage = `Your total calories consumers are: ${toCalculate.total}`;
    alert(this.confirmMessage);
  }

  addItem() {
    this.calories.unshift(new Calorie({}));
  }

  deleteItem(index: number) {
    this.calories.splice(index, 1);
    this.saveItemsToLocalStorage(this.calories);
  }

  saveItem(calorie: any) {
    const food = calorie.food;
    const servingSize = calorie.servingSize;
    const quantity = calorie.quantity;
    const calories = calorie.calories;
    if (food == null || servingSize == null || quantity == null || calories == null) {
      this.toastService.showToast('danger', 'Save failed! Please specify all fields', 2000);

    } else {
      calorie.editing = false;
      this.saveItemsToLocalStorage(this.calories);
    }




  }

  saveItemsToLocalStorage(calories: Array<Calorie>) {
    this.localStorageService.saveItemsToLocalStorage(calories);
    // const savedCalories = localStorage.setItem('calories', JSON.stringify(calories));
    // return savedCalories;
  }

  getItemsFromLocalStorage(key: string) {
    const savedCalories = JSON.parse(localStorage.getItem(key));
    return this.localStorageService.getItemsFromLocalStorage(key);
    // return savedCalories;
  }

  searchItem(params: string) {
    console.log('from searchItem params: ', params);
    this.calories = this.calories.filter((item: Calorie) => {
      const fullName = item.food;
      console.log('full name is --->', fullName);
      console.log('items--->', item.food);
      if (params === fullName || params === item.food) {
        return true;
      } else {
        return false;
      }
    });
  }

  logout() {
    this.localStorageService.clearItemsFromLocalStorage('user');

    this.router.navigate(['']);

  }
}
