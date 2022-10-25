import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { CardEventComponent } from './shared/components/card-event/card-event.component';
import { ModalSubscribeComponent } from './shared/components/modal-subscribe/modal-subscribe.component';
import { ProfilePageComponent } from './views/profile-page/profile-page.component';
import { TelaCadastroComponent } from './views/cadastro-page/tela-cadastro.component';
import { TelaLoginComponent } from './views/login-page/tela-login.component';
import { CertificatesComponent } from './shared/components/profile/certificates/certificates.component';
import { ContentComponent } from './shared/components/profile/content/content.component';
import { CertificateCardComponent } from './shared/components/profile/certificates/certificate-card/certificate-card.component';

import { AuthService } from './shared/services/auth.service';
import { ContentService } from './shared/services/content.service';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CreateEventPageComponent } from './views/create-event-page/create-event-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    CardEventComponent,
    ModalSubscribeComponent,
    ProfilePageComponent,
    TelaCadastroComponent,
    TelaLoginComponent,
    ContentComponent,
    CertificatesComponent,
    CertificateCardComponent,
    CreateEventPageComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, ContentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
