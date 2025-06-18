import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    RouterModule,
    CommonModule
  ]
})
export class AdminLayoutModule { }
