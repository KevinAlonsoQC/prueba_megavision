import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicio/api.service';
import { AlertController } from '@ionic/angular';
import { Cliente, ClienteID } from 'src/app/Modelos/cliente';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  public usuarios: Array<ClienteID> = [];

  constructor(
    private api: ApiService,
    private router: Router,
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    //this.api.CallBack_Usuarios().subscribe(callback => (this.usuarios = callback))
  }

  ir_usuarios(){
    this.router.navigateByUrl('listar-cliente')
  }

  cerrar_sesion(){
    localStorage.clear();
    this.router.navigateByUrl('/')
  }
}
