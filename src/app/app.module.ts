import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileManagerComponent } from './newcomponents/file-manager/file-manager.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBarModule


@NgModule({
  declarations: [
    AppComponent,
    FileManagerComponent,
    SafeUrlPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
