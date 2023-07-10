import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }
  
  getData<M>(url : string){
    url = 'http://universities.hipolabs.com/search?country=United+States';
    return this.http.get<M[]>(url);
  }
 
  
}
