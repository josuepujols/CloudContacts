import { Component, OnInit, DoCheck } from '@angular/core';
import { ContactService } from '../Services/contact.service';
import {Router} from '@angular/router';
import { DataService } from '../Services/data.service';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css'],
	providers: [ContactService]
})
export class FormComponent implements OnInit {

	private contacto:any;
	private router:Router;


	//Propiedades del contacto 
	public nombre:string;
	public apellido:string;
	public telefono:string;
	public correo:string;

	constructor( private peticion:ContactService, public data_service:DataService ) {
	}

	ngOnInit(): void {
  	}

	ngDoCheck() {
		//console.log(this.contact_model);
	}

	//Metodo para agregar el contacto 
	add_contact(form) {
		this.contacto = {
			'nombre': this.data_service.nombre,
			'apellido': this.data_service.apellido,
			'telefono': this.data_service.telefono,
			'email': this.data_service.email
		}

		console.log(this.contacto);

		if (this.data_service.nombre && this.data_service.apellido && this.data_service.telefono) {
			this.peticion.add_contact_service(this.contacto).subscribe(
				result => {
					console.log(result);
					alert("El contacto " + "'" + this.contacto.nombre + "'" + " ha sido agregado correctamente.");
					form.reset();
				},
	
				error => {
					console.log(error);
				}
			);
		}
		else {
			alert("Debe llenar los campos requeridos.");
		}
	}

	update_contact(id:number) {
		//Activamos y desactivamos los botones necesarios 
		const boton_update = document.getElementById('boton-update');
		const boton_add = document.getElementById('boton-form');
		boton_add.removeAttribute('disabled');
		boton_update.setAttribute('disabled', 'true');

		//Creamos el objeto a enviar 
		const objeto = {
			'nombre': this.data_service.nombre,
			'apellido': this.data_service.apellido,
			'telefono': this.data_service.telefono,
			'email': this.data_service.email
		}

		console.log(objeto);

		//Realizamos la peticion 
		this.peticion.update_contact_service(id, objeto).subscribe(

			result => {
				alert("Se ha actualizado el contacto " + "'" + objeto.nombre + "'" + " con exito");
				console.log(result);
			},	
			error => {
				console.log(error);
			}
		);

	}

}
