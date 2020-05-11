import { Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { LoginComponent  } from './login/login.component';
import { CalorieComponent } from './calorie/calorie.component';


const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'calories',
        component: CalorieComponent
    },
    {
        path: '**',
        component: LoginComponent
    }
]


export const AppRoutes = RouterModule.forRoot(appRoutes);
