import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from '../components/home/home.component';
import { CallbackComponent } from '../common/callback/callback.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'callback', component: CallbackComponent },
      // {
      //   path: '',
      //   loadChildren: () => import('../common/modules/home.module').then(m => m.HomeModule)
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
