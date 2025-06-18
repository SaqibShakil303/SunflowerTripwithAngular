import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewDestinationsComponent } from './view-destinations/view-destinations.component';
import { AddDestinationComponent } from './add-destination/add-destination.component';
import { UpdateDestinationComponent } from './update-destination/update-destination.component';
import { DestinationsComponent } from '../../components/destinations/destinations.component';

const routes: Routes = [
    { path: '', component: ViewDestinationsComponent },
  { path: 'add', component: AddDestinationComponent },
  { path: 'edit/:id', component: UpdateDestinationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DestinationManagementRoutingModule { }
