import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})

export class InicioPage implements OnInit {

  //Variables que reciben los datos del Login:
  userHome: string="";
  passHome: string="";

  constructor(private activeroute: ActivatedRoute, private router: Router) {
    this.activeroute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation()?.extras.state){
        //Si se consigue que en la navagacion hay datos lo puedo guardar en variables propias:
        this.userHome = this.router.getCurrentNavigation()?.extras?.state?.['email'];
        this.passHome = this.router.getCurrentNavigation()?.extras?.state?.['password'];
      }
    })
  }

  ngOnInit() {
  }

}
