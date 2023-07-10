import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  public database!: SQLiteObject;
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS user(id_user INTEGER PRIMARY KEY autoincrement, mail VARCHAR(70) NOT NULL, password VARCHAR(30) NOT NULL);";
  //Variable para registro iniciales:
  registroUsuario: string = "INSERT or IGNORE INTO user(id_user, mail, password) VALUES(1, 'blasbustosmarco@gmail.com', '#12345');";
  //Observable para manipular los datos del usuario:
  listaUsuario = new BehaviorSubject([]);
  //Observable para manipular la bd si esta lista o no:
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router
  ) { 
    this.crearBD();
  }

  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 3000,
      position: 'bottom'
    });
    await toast.present();
  }
  //Método para proteger ruta:
  canActivate(){
    this.router.navigate(['login']);
    return false;
  }

  //Método para retornar el status de la BD:
  dbState(){
    return this.isDBReady.asObservable();
  }

  //Metodo para devolver los observables de los registros de cada tabla:
  fectchUsuario(): Observable<Usuario[]> {
    return this.listaUsuario.asObservable();
  }

  //Crear la BD:
  crearBD(){
    //Verficar que la plataforma esté lista:
    this.platform.ready().then(()=>{
      //Crear la BD:
      this.sqlite.create({
        name: 'bduser.db',
        location: 'default'
      })
      .then((db: SQLiteObject)=>{
        //Guardar la conexion en mi variable:
        this.database = db;
        //Llamar a la funcion que crea las tablas y sus registros:
        this.crearTablas();
      })
      .catch(e=>{
        this.presentToast("Error en la creación de la BD " + e);
      })
    })
  }

  async crearTablas(){
    try {
      //Creacion de tablas en orden, primero las que no dependen de nadie y despues las que dependen
      await this.database.executeSql(this.tablaUsuario, []);
      //Insertar lo datos en las tablas
      await this.database.executeSql(this.registroUsuario, []);
      //cargar esos registros en el observable:
      this.buscarUsuario();
      this.isDBReady.next(true);

    }catch(e){
      this.presentToast("Error en la creacion de la tabla: " + e);
    }
  }

  buscarUsuario(){
    return this.database
    .executeSql('SELECT * FROM usuario', [])
    .then(res => {
      //creo mi lista de objetos de usuarios vacio:
      let items: Usuario[] = [];
      //Si cuento mas de 0 filas en el resultSet entonces agrego los registros al item
      if(res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id_user,
            mail: res.rows.item(i).mail,
            password: res.rows.item(i).password
          })
        }
      }
      //Actualizo el observable de las noticias:
      this.listaUsuario.next(items as any);
    })
  }

  insertarUsuario(mail: any, password: any){
    let data = [mail, password];
    return this.database.executeSql('INSERT INTO user(mail,password) VALUES(?,?)', data).then(res=>{
      this.buscarUsuario();
    });
  }

  modificarUsuario(id: any, mail: any, password: any){
    let data = [mail, password, id];
    return this.database.executeSql('UPDATE user SET mail = ?, password = ? WHERE id_user = ?' , data)
    .then(data2 => {
      this.buscarUsuario();
    })
  }

  eliminarUsuario(id: any){
    return this.database.executeSql('DELETE FROM usuario WHERE id_usuario = ?', [id])
    .then(a=>{
      this.buscarUsuario();
    })
  }



}
