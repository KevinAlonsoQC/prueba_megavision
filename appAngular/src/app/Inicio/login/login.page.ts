import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicio/api.service';
import { AlertController } from '@ionic/angular';
import { Cliente, ClienteID } from 'src/app/Modelos/cliente';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public usuarios: Array<ClienteID> = [];

  constructor(
    private api: ApiService,
    private router: Router,
    private activated: ActivatedRoute,
    private alertController: AlertController
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.api.getClientes().subscribe(callback => (this.usuarios = callback))
  }

  async iniciar_sesion() {
    const alert = await this.alertController.create({
      header: 'Edita los campos a editar',
      inputs: [
        {
          name: 'correo',
          type: 'email',
          placeholder: 'correo@correo.cl',
        },
        {
          name: 'clave',
          type: 'password',
          placeholder: 'Contraseña'
        },
      ],

      buttons: [
        {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'danger',
        },
        {
            text: 'Iniciar',
            handler: (data) => {
              var sesion = false;

              for(let info of this.usuarios){
                if(info.email === data.correo && info.password == data.clave){
                  sesion = true;
                  if(info.rol === 'admin'){
                    localStorage.setItem('admin', 'true')
                  }else{
                    localStorage.setItem('noadmin', 'false')
                  }

                  localStorage.setItem('infoUser', JSON.stringify(info));
                  localStorage.setItem('ingresado', 'true')
                  this.router.navigateByUrl('index')
                  break
                }
              }

              if(!sesion){
                this.errorSesion();
              }
            }
        }
    ]
    });

    await alert.present();
  }

  async errorSesion() {
    const alert2 = await this.alertController.create({
      header: '¡Email y/o Contraseña incorrecta!',

      buttons: [
        {
            text: 'Ok',
            role: 'cancel',
            cssClass: 'danger',
        },
      ]
    });
    await alert2.present();
  }
}

