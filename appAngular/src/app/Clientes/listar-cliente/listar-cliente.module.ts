import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarClientePageRoutingModule } from './listar-cliente-routing.module';

import { ListarClientePage } from './listar-cliente.page';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from '../../servicio/api.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarClientePageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [ListarClientePage],
  providers: [ApiService]
})
export class ListarClientePageModule {}
