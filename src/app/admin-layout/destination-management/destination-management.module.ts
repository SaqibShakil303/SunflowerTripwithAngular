import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DestinationManagementRoutingModule } from './destination-management-routing.module';
import { DestinationFormComponent } from './destination-form/destination-form.component';
import { UpdateDestinationComponent } from './update-destination/update-destination.component';
import { AddDestinationComponent } from './add-destination/add-destination.component';
import { ViewDestinationsComponent } from './view-destinations/view-destinations.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
     ViewDestinationsComponent,
    AddDestinationComponent,
    UpdateDestinationComponent,
    DestinationFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DestinationManagementRoutingModule,
     MatTabsModule, MatInputModule, MatButtonModule, MatIconModule
  ],
    exports: [DestinationFormComponent],
    
})
export class DestinationManagementModule { }
