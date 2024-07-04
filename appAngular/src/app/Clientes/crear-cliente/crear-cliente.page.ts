import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../servicio/api.service';

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
    private router: Router
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

  campo(control: string) {
    return this.formulario.get(control);
  }

  fueTocado(control: string){
    return this.formulario.get(control).touched;
  }

  estaSucio(control: string){
    return this.formulario.get(control).dirty;
  }

  ngOnInit() {
  }

  saveCuenta(): void {
    if(this.formulario.invalid){
      this.formulario.markAllAsTouched();
      return;
    }

    if(this.formulario.value.admin == 1){
      this.formulario.value.admin = 'admin';
    }
    else{
      this.formulario.value.admin = 'user';
    }

    this.formulario.value.registration_date = new Date().toISOString().split('T')[0];

    this.api.addCliente({...this.formulario.value}).subscribe(resultado =>
      {
        if(resultado){
          this.formulario.reset();
          this.formulario.updateValueAndValidity();
          this.router.navigate(['']);
        }
      }
    )
  }

}
