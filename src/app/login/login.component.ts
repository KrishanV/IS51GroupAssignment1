import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from '../localStorageService';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';


export interface IUser {
  id?: number;
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: IUser = {username: '', password: ''};
  localStorageService: LocalStorageService<IUser>;
  toastTypes: Array<string> = [];
  currentUser: IUser = null;
  constructor(private router: Router, private toastService: ToastService) {
    this.localStorageService = new LocalStorageService('user');
    this.toastTypes = ['success', 'info', 'warning', 'danger', 'primary', 'secondary', 'dark'];
   }

  ngOnInit(): void {
    this.currentUser = this.localStorageService.getItemsFromLocalStorage();

    if (this.currentUser != null) {
      this.router.navigate(['calories']);

    }
  }

  login(user: IUser) {

    const defaultUser: IUser = { username: 'befit', password: 'befit1' };
    if (user.username !== '' && user.password !== '') {
      if (user.username === defaultUser.username && user.password === defaultUser.password) {

        this.localStorageService.saveItemsToLocalStorage(user);
        this.router.navigate(['calories', user]);


      } else {
        this.toastService.showToast('danger', 'Login failed! Please check your username or password', 2000);

      }
    } else {
      this.toastService.showToast('danger', 'Login failed! Please specify username and/or password', 2000);
    }
  }

  showToast(){
    const rand = Math.floor(Math.random() * 7);

    const toastType = this.toastTypes[rand];
    const toastMessage = 'Hi, your lucky number is: ' + rand;
    const duration = 4000;
    this.toastService.showToast(toastType, toastMessage, duration);
  }
}
