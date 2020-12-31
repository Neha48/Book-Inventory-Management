import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CardComponent } from './card/card.component';
import {DialogComponentComponent as DialogUpdateComponent} from './dialogupdate/dialogupdate.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { ViewComponent } from './view/view.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SharedService } from './sharedservice.service';
@NgModule({
  declarations: [
    AppComponent,CardComponent,DialogUpdateComponent, AddComponent, UpdateComponent, ViewComponent, HomeComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,MatFormFieldModule,MatButtonModule,MatDialogModule,MatInputModule,MatToolbarModule,MatSelectModule,MatTabsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
