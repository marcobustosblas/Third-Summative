import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  //Variables que reciben los datos del Login:
  userCuenta: string="";
  userPass: string="";

  constructor(private activeroute: ActivatedRoute, private router: Router) { 
    this.activeroute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation()?.extras.state){
        //Si se consigue que en la navagacion hay datos lo puedo guardar en variables propias:
        this.userCuenta = this.router.getCurrentNavigation()?.extras?.state?.['email'];
        this.userPass = this.router.getCurrentNavigation()?.extras?.state?.['password'];
      }
    })
  }

  ngOnInit() {
  }

}
