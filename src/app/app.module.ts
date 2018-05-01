import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BankDepositsComponent } from './bank-deposits/bank-deposits.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 

import {MatOptionModule,MatSelectModule,MatInputModule,MatFormFieldModule,
  MatTabsModule,MatDatepickerModule,MatNativeDateModule,MatButtonModule} from '@angular/material';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { BankDepositsService } from '../app/bank-deposits.service';
import {HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation.component';
import { InsuranceComponent } from './insurance/insurance.component'
import { InsuranceService } from './insurance.service';



@NgModule({
  declarations: [
    AppComponent,
    BankDepositsComponent,
    NavigationComponent,
    InsuranceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,MatSelectModule,MatFormFieldModule,MatInputModule,MatTabsModule,
    NoopAnimationsModule,MatDatepickerModule,MatNativeDateModule,MatButtonModule,
    HttpClientModule
  ],
  exports:[
    MatOptionModule,MatSelectModule,MatFormFieldModule,MatInputModule,
    MatTabsModule,MatDatepickerModule
  ],
  providers: [
    BankDepositsService,
    InsuranceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
