import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-apiexterna',
  templateUrl: './apiexterna.page.html',
  styleUrls: ['./apiexterna.page.scss'],
})
export class ApiexternaPage implements OnInit {

  getdata:any[] = [];
  
  constructor(public services: ApiService) { 

    this.services.getData<any[]>("").subscribe(data => {
    this.getdata = data;
    console.log(this.getdata);
    })

  }

  ngOnInit() {
  }

}
