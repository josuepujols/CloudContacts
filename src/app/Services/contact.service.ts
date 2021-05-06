import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ContactService {
    private url:string;

    constructor( private http:HttpClient ) {

    }

    //Metodo para agregar un contacto 
    add_contact_service(contacto:any):Observable<any> {
        //Establecemos las cabceras
        this.url = "https://cloud-contacts.herokuapp.com/new-contact";
        const headers = new HttpHeaders().set('Content-Type','application/json');
        //Hacemos la peticion
        return this.http.post(this.url, contacto, {headers: headers});
    }

    //Metodo para listar los contactos 
    get_contacts():Observable<any> {
        this.url = "https://cloud-contacts.herokuapp.com/contacts";
        //Hacemos la peticion 
        return this.http.get(this.url);
    }

    //Metodo para buscar contacto 
    search_contact_service(texto:string):Observable<any> {
        this.url = "https://cloud-contacts.herokuapp.com/search/" + texto;
        //hacemos la peticion 
        return this.http.get(this.url);
    }

    //Metodo para actualizar contacto 
    update_contact_service(id:number, contacto:any):Observable<any> {
        this.url = "https://cloud-contacts.herokuapp.com/update-contact/" + id;
        //Establecemos la cabecera
        const headers = new HttpHeaders().set('Content-Type','application/json');
        //Hacemos la peticion 
        return this.http.put(this.url, contacto, {headers: headers});
    }

    //Metodo para borrar un contacto 
    delete_contact_service(id:number):Observable<any> {
        this.url = "https://cloud-contacts.herokuapp.com/delete-contact/" + id;
        //Hacemos la peticion
        return this.http.delete(this.url);
    }

}


