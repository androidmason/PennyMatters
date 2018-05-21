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
      
      let amount = 0;
      if(this.bankDeposits.depositType == 'fd'){
        amount = +this.bankDeposits.depositAmount + (+this.bankDeposits.depositAmount * (+this.bankDeposits.tenure/12) * (+this.bankDeposits.rateOfInterest/100));
      }
      if(this.bankDeposits.depositType == 'rd'){
        /*
        * Amount = P*(1+r/n)^nt
        * P: Principle
        * r: Rate
        * n: number of quaters(compound frequency)
        * t: time duration in month
        */
       let noOfQuaters = 12 / 3; // Since RD is compounded quaterly
       let yearsLeft;
       let rateOfIntrest = (this.bankDeposits.rateOfInterest)/100;

        for(let index = 0; index< this.bankDeposits.tenure; index++)
        {
          yearsLeft = (this.bankDeposits.tenure - index) / 12; // Time left for maturity in years 
          amount += this.bankDeposits.depositAmount * Math.pow((1 + (rateOfIntrest/noOfQuaters)), (noOfQuaters * yearsLeft));
        }
      }
      this.bankDeposits.maturityAmount = "" + amount;
  }

  save(): void{

      console.log("Button clicked")
      var x = this.bankDepositsService.updateBankDeposits(this.bankDeposits);
      x.subscribe(x => console.log("x"))

  }



}
