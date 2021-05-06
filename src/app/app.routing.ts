//Importo los modulos necesarios 
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

import { AppComponent } from './app.component';
import { FormComponent } from "./form/form.component";


//Creo mis rutas

const app_routes: Routes = [
    {path: "", component: AppComponent},
    {path:"contacts", component: FormComponent}
];

export const app_routing_providers: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(app_routes); 


