import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  mail = "";
  password = "";

  constructor(
    private dbServive: DbService, 
    public router: Router, 
    private toastController: ToastController)
    { }

  async presentToast(msj:string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 3000,
      position: 'bottom',
    });

    await toast.present();
  }

  insertar(){
    this.dbServive.insertarUsuario(this.mail, this.password)
    .then(()=>{
      this.presentToast('¡Registro Exitoso!');
    })
    .catch(e => {
      this.presentToast('Error en el registro' + e);
    });
  }



  ngOnInit() {
  }

}
