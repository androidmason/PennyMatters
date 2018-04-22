import { Component, OnInit, NgModule } from '@angular/core';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { BankDepositsService } from '../bank-deposits.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BankDeposits } from '../bank-deposits'

@Component({
  selector: 'app-bank-deposits',
  templateUrl: './bank-deposits.component.html',
  styleUrls: ['./bank-deposits.component.css']
})
export class BankDepositsComponent implements OnInit {

  bankDeposits:BankDeposits = {};

  constructor(private bankDepositsService : BankDepositsService) { }

  ngOnInit() {
  }

  deposits = [
    {value: 'savings', viewValue: 'Savings'},
    {value: 'fd', viewValue: 'Fixed Deposit'},
    {value: 'rd', viewValue: 'Recurring Deposit'}
  ];

  calculateMaturityAmount(): void {
      console.log('Computing ' + this.bankDeposits.depositAmount + ' ' + this.bankDeposits.tenure + ' ' + this.bankDeposits.rateOfInterest)
      if(this.bankDeposits.depositType == 'fd'){
      this.bankDeposits.maturityAmount = +this.bankDeposits.depositAmount + (+this.bankDeposits.depositAmount * (+this.bankDeposits.tenure/12) * (+this.bankDeposits.rateOfInterest/100));
      }
      if(this.bankDeposits.depositType == 'rd'){
        
      }
  }

  save(): void{

      console.log("Button clicked")
      var x = this.bankDepositsService.updateBankDeposits(this.bankDeposits);
      x.subscribe(x => console.log("x"))

  }



}
