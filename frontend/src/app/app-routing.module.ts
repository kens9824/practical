import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NewUserComponent } from './new-user/new-user.component'


// Import the authentication guard

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'new',
    component: NewUserComponent
  },
  {
    path: ':id',
    component: NewUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
