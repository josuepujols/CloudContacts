import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	//Creo las propiedades del contacto 
	id:number = 0;
	nombre:string = "";
	apellido:string = "";
	telefono:string = "";
	email:string = "";
	
	constructor() {

	}
}
