import { Component, OnInit } from '@angular/core';
import { Insurance } from '../insurance';
import { InsuranceService } from '../insurance.service';
import { resource } from 'selenium-webdriver/http';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

  insurance:Insurance = {};

  constructor(private insuranceService: InsuranceService) { 
  }

  ngOnInit() {
    this.fetchData()
  }

  fetchData(): void{
      console.log('fetching')
      let x = this.insuranceService.findInsurance();
      x.subscribe(ins => ins.forEach((y: Insurance) => console.log(y.insuranceType)))  
}

  insurances = [
    {value: 'term', viewValue: 'Term'},
    {value: 'endowment', viewValue: 'Endowment'},
    {value: 'card', viewValue: 'Credit Card Insurance'}
  ];

  premiumFrequency = [
    {value: 'annual', viewValue: 'Annual'},
    {value: 'oneTime', viewValue: 'One Time'},
    {value: 'monthly', viewValue: 'Monthly'},
    {value: 'none', viewValue: 'None'}
  ];

  save(): void {
    console.log("clicked " + this.insurance)
     let x = this.insuranceService.addInsurance(this.insurance);
     console.log(" returned")
     x.subscribe(results => console.log(results.toString))
  }

}
