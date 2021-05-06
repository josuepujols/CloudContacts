import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { ContactService } from "../Services/contact.service";
import { DataService } from '../Services/data.service';
import { ContactModel } from './contact.model';

declare const $:any;

@Component({
	selector: 'app-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['./contacts.component.css'],
	providers: [ContactService]
})
export class ContactsComponent implements OnInit {

	public listado_contactos:string[];
	public text_search:string;
	private object_model:ContactModel;
	private form_object:FormComponent;

	constructor( private peticion:ContactService, private data_service:DataService ) {
		this.listado_contactos = []; 
		this.object_model = new ContactModel();
	}
	
	ngOnInit(): void {
		this.show_contacts();
	}


	//Metodo para mostrar todos los contactos
	show_contacts() {
		//Llamos el metodo de nuestro servicio 
		this.peticion.get_contacts().subscribe(
			result => {
				//Limpiamos el array
				this.listado_contactos.splice(0), this.listado_contactos.length;
				//Recogemos el JSON y almacenamos cada dato en el array
				for (let i = 0; i < result.length; i++) {
					this.listado_contactos.push(result[i]);
				}
			},

			error => {
				console.log(error);
			}
		);

		console.log(this.listado_contactos);

	}

	//Metodo para recargar la pagina cuando se inserte un contacto 
	reload_page() {
		window.location.reload();
	}

	//Metodo para buscar un contacto 
	search_contact() {
		
		try {
			//Llamamos el metodo para buscar de nuestro servicio 
			this.peticion.search_contact_service(this.text_search).subscribe(
				result => {
					//Eliminamos todos los elemento del array
					this.listado_contactos.splice(0), this.listado_contactos.length;
					//LLenamos el array con nuevos elementos 
					for (let k = 0; k < result.length; k++) {
						this.listado_contactos.push(result[k]);
						console.log(this.listado_contactos);
					}	

				},

				error => {
					console.log(error);
				}
			);
		}
		catch(error) {
			console.log(error);
		}
	}


	//Metodo para limpiar textbox de busqueda 
	clear_text() {
		this.text_search = "";

		this.data_service.id = 0;
		this.data_service.nombre = "";
		this.data_service.apellido = "";
		this.data_service.telefono = "";
		this.data_service.email = "";
	}

	//Metodo para actualizar un contacto
	update_contact(dato) {
		this.data_service.id = dato.id;
		this.data_service.nombre = dato.nombre;
		this.data_service.apellido = dato.apellido;
		this.data_service.telefono = dato.telefono;
		this.data_service.email = dato.email;

		console.log(this.data_service.nombre);

		//Activamos y desactivamos los botones necesarios
		const boton_update = document.getElementById('boton-update');
		const boton_add = document.getElementById('boton-form');
		boton_update.removeAttribute('disabled');
		boton_add.setAttribute('disabled', 'true');
	}

	//Metodopara borrar un contacto 
	delete_contact(dato, index) {
		const id = dato.id;

		const confirmar = confirm("Desea eliminar el contacto " + "'" + dato.nombre + "'" + "?");

		//Confirmamos si el usuario quiere eliminar el contacto
		if (confirmar) {
			//hacemos la peticion 
			this.listado_contactos.splice(index);
			this.peticion.delete_contact_service(id).subscribe(
				result => {
					
				}, 
				error => {
					console.log(error);
				}
			);
		}

	}

}
