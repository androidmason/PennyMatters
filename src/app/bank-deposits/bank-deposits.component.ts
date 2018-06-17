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
  chartData: Object[];
  drillDownData: Object[];

  constructor(private bankDepositsService : BankDepositsService) { }

  ngOnInit() {
    this.fetchData();
  }

  deposits = [
    {value: 'savings', viewValue: 'Savings'},
    {value: 'fd', viewValue: 'Fixed Deposit'},
    {value: 'rd', viewValue: 'Recurring Deposit'}
  ];

  calculateMaturityAmount(): void {
      console.log('Computing ' + this.bankDeposits.depositAmount + ' ' + this.bankDeposits.tenure + ' ' + this.bankDeposits.rateOfInterest)
      
      let amount = 0;
      if(this.bankDeposits.depositType == 'fd' || this.bankDeposits.depositType == 'savings'){
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

  fetchData(): void{
    let fdData: Object[] = new Array() 
    let rdData: Object[] = new Array()
    let savingsData : Object[] = new Array()
    this.bankDepositsService.findDeposits().subscribe(x => {
       x.forEach(element => {
          if(element.depositType == 'fd'){
            fdData.push([element.bankName,+element.maturityAmount])
          }
          else if(element.depositType == 'rd'){
            rdData.push([element.bankName,+element.maturityAmount]) 
          }
          else if(element.depositType == 'savings'){
            savingsData.push([element.bankName,+element.maturityAmount])     
          }
          })

          console.log(fdData[0][1])

          this.chartData = new Array()
          let fdAmount; 
          if(fdData.length <= 1)
            fdAmount = fdData[0][1]
          else 
            fdAmount = fdData.reduce((a,b) =>parseInt(a[1])+parseInt(b[1]))
          this.chartData.push( new Object({
           "name" :  'fd',
           "y" : +fdAmount,
           "drillDown" : 'fd'
         }))
 
         let rdAmount; 
         if(rdData.length <= 1)
         rdAmount = rdData[0][1]
         else 
         rdAmount = rdData.reduce((a,b) =>parseInt(a[1])+parseInt(b[1]))

         this.chartData.push( new Object({
           "name" :  'rd',
           "y" : +rdAmount,
           "drillDown" : 'rd'
         }))

         let savingsAmount; 
         if(savingsData.length <= 1)
         savingsAmount = savingsData[0][1]
         else 
         savingsAmount = savingsData.reduce((a,b) =>parseInt(a[1])+parseInt(b[1]))

 
         this.chartData.push( new Object({
           "name" :  'savings',
           "y" : +savingsAmount,
           "drillDown" : 'savings'
         }))    

        this.drillDownData = new Array
        this.drillDownData.push({
          "name" : 'fd',
          "id" : 'fd',
          "data" : fdData 
        })

        this.drillDownData.push({
          "name" : 'rd',
          "id" : 'rd',
          "data" : rdData 
        })

        this.drillDownData.push({
          "name" : 'savings',
          "id" : 'savings',
          "data" : savingsData 
        })



        } 
      );    
}




}
