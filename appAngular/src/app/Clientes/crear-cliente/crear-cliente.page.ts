import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../servicio/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.page.html',
  styleUrls: ['./crear-cliente.page.scss'],
})
export class CrearClientePage implements OnInit {

  public formulario: FormGroup;

  constructor(
    private api: ApiService,
    private _builder: FormBuilder,
    private router: Router,
    private alertController: AlertController
  ) {
    this.formulario = this._builder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ],

      password: [
        '',
        [
          Validators.required,
        ]
      ],

      rol: [
        0,
        [
          Validators.required
        ]
      ],

      registration_date: [
        '',
        [
          Validators.required
        ]
      ],

      country_id: [
        0,
        [
          Validators.required
        ]
      ],
    })
  }

  ngOnInit() {
  }

  async createCliente() {
    const alert = await this.alertController.create({
      header: '¿Seguro de Crear este Cliente?',
      subHeader: 'Cliente: ' + this.formulario.value.name,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
        },
        {
          text: 'Crear',
          handler: () => {
            if (this.formulario.value.admin == 1) {
              this.formulario.value.admin = 'admin';
            } else {
              this.formulario.value.admin = 'user';
            }

            this.formulario.value.registration_date = new Date().toISOString().split('T')[0];

            this.api.addCliente({ ...this.formulario.value }).subscribe(resultado => {
              if (resultado) {
                this.formulario.reset();
                this.formulario.updateValueAndValidity();
                this.router.navigate(['index']);
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
