import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { GiftListComponent } from './gift-list/gift-list.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LogoContactComponent } from './nav/logo-contact/logo-contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'; 
import { CommissionArtComponent } from './commission-art/commission-art.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    GiftListComponent,
    FooterComponent,
    LogoContactComponent,
    CommissionArtComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatBottomSheetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
