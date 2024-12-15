import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ViewFileComponent } from './components/view-file/view-file.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FileManagerComponent } from './newcomponents/file-manager/file-manager.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'}, // Redirect unknown routes to Home
  // { path: '', component: FileManagerComponent },
  // { path: 'files', component: HomeComponent },
  { path: 'home', component: FileManagerComponent },
  // { path: 'view-file/:id', component: ViewFileComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }, // Redirect unknown routes to Home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
