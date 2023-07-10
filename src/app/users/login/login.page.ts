import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo: string = "";
  clave: string = "";

  public progress = 0;

  //Variables creadas como una bd estática:

  user1 = "marco@gmail.com";
  pass = "marco2023";


  constructor(
    private toastController: ToastController, 
    private router: Router
  ) {          
 
    setInterval(() => {
      this.progress += 0.01;
      if (this.progress > 1) {
        setTimeout(() => {
          this.progress = 0;
        }, 1000);
      }
    }, 50);

  }

  ngOnInit() {
  }

  PasarDatos(){
    if(this.correo == this.user1 && this.clave == this.pass){
      let navigationExtras: NavigationExtras = {
        state:{
          email: this.correo,
          password: this.clave
        }
      };
      this.router.navigate(['/cuenta'], navigationExtras);

    }else{
      this.presentToast("Usuario y/o contraseña incorrectos");
    }
  }

  async presentToast(msj:string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 3000,
      position: 'bottom',
    });

    await toast.present();
  }

}


//Router sirve para el reenvio de datos