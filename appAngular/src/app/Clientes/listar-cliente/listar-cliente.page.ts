import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from '../../servicio/api.service';
import { ClienteID } from '../../Modelos/cliente';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.page.html',
  styleUrls: ['./listar-cliente.page.scss'],
})
export class ListarClientePage implements OnInit {

  public clientes: Array<ClienteID> = [];
  public texto_carga: string = "Trayendo más para ti <3";
  public admin: boolean = false;

  constructor(
    private api: ApiService,
    private router: Router,
    private ruteador: ActivatedRoute,
    private alertController: AlertController
  ) { }

  ngOnInit() {}

  ionViewWillEnter(){
    this.api.getClientes().subscribe(callback => (this.clientes = callback))

    if(localStorage.getItem('admin')){
      this.admin = true
    }else if(localStorage.getItem('noadmin')){
      this.admin = false
    }
  }

  crearCliente() {
    this.router.navigateByUrl('/crear-cliente');
  }

  async deleteCliente(pro: ClienteID) {
    const alert = await this.alertController.create({
      header: '¿Seguro de Eliminar este Cliente?',
      subHeader: 'Cliente: '+pro.name+' #'+pro.id,
      buttons: [
        {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'danger',
        },
        {
            text: 'Eliminar',
            handler: () => {
              this.api.deleteCliente(pro.id).subscribe();
              this.router.navigateByUrl('/index');
            }
        }
    ]
    });

    await alert.present();
  }

  async updateCliente(pro: ClienteID) {
    const alert = await this.alertController.create({
      header: '¿Seguro de Editar este Cliente?',
      subHeader: 'Cliente: '+pro.name+' #'+pro.id,
      buttons: [
        {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'danger',
        },
        {
            text: 'Editar',
            handler: () => {
              this.ruteador.params.subscribe((params : Params) => {
                this.router.navigate(['/modificar-cliente', pro.id])
              });
            }
        }
    ]
    });

    await alert.present();
  }
}
