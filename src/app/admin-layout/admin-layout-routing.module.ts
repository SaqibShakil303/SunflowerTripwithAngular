import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { ItineraryComponent } from '../pages/itinerary/itinerary.component';
// import { DestinationFormComponent } from './destination-management/destination-form/destination-form.component';

const routes: Routes = [
  //   {
  //   path: 'destination/add',
  //   component: DestinationFormComponent,
  //   data: { mode: 'add' }
  // },
  // {
  //   path: 'destination/edit/:id',
  //   component: DestinationFormComponent,
  //   data: { mode: 'edit' }
  // },
  {
  path: '', component: AdminLayoutComponent, children: [
   { path: 'itinerary-admin', component: ItineraryComponent },
   {
  path: 'destinations-admin',
  loadChildren: () => import('./destination-management/destination-management.module').then(m => m.DestinationManagementModule)
}
  ]
  },
//   {
//   path: 'destinations-admin',
//   loadChildren: () =>
//     import('./destination-management/destination-management.module').then(
//       (m) => m.DestinationManagementModule
//     )
// }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
