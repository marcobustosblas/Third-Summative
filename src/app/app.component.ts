import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: 'inicio', icon: 'home' },
    { title: 'Login', url: 'login', icon: 'log-in' },
    { title: 'Mi Cuenta', url: 'cuenta', icon: 'person' },
    { title: 'Mis Pedidos', url: 'compras', icon: 'gift' },
    { title: 'Carrito', url: 'carrito', icon: 'cart' },
  ];
  public labels = ['Promociones', 'Descuentos'];
  constructor() {}
}
