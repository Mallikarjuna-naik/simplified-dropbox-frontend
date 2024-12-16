import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileManagerComponent } from './newcomponents/file-manager/file-manager.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'}, // Redirect default routes to Home
  { path: 'home', component: FileManagerComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }, // Redirect unknown routes to Home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
