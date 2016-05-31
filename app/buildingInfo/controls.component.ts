import { Component, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

import { MortgateTable, BuildingList, NeiborhoodAutocomplete, InterestRate, DefaultValue, CalcParam } from '../fallbackData/data-structure';
import { DataService } from '../data.services';
import { autocompleteComponent } from '../shared/autocomplete.component';
import { MathProcessor } from './controls.services';
import { TableResultComponent } from './tableResult.component'
import { GenericResults } from './genericResults.component'

@Component({
  selector: 'my-controls',
  templateUrl: `app/buildingInfo/controls.component.html`,
  styleUrls: ['app/buildingInfo/controls.component.css'],
  directives: [NgClass, NgIf, autocompleteComponent, TableResultComponent, GenericResults]
})
export class ControlsComponent implements OnInit {
	BuildingLists: BuildingList[];
	Neiborhoodlists: NeiborhoodAutocomplete[];
	InterestRates: InterestRate[];
	defaultValue: DefaultValue;
	mortgateTable: MortgateTable[];
	calcParam: CalcParam;


	// Later this will be a indicator if we have the default/fallback or the HTTP request data.
	BuildingLists_updated: boolean = false;
	Neiborhoodlists_updated: boolean = false;
	InterestRates_updated: boolean = false;

	tooltipHint = {
		houseToolTip: "Expected % of price increase of the house per year",
		investmentToolTip: "Expected annual return on long term investment",
		rentIncreaseToolTip: "Expected annual increase of the rent",
		youLiveSomewhere: "If you dont live there you will pay rent somewhere else at the same time",
		whereDoesItComeFrom: "Data come from Quandl website. US only"
	}

	constructor(
		private mathProcessor: MathProcessor,
	  	private dataService: DataService) {}

	getDownloadClass(typeOfData: boolean): Object {
		if(typeOfData) {
			return {'bg-success':true};
		} else {
			return {'bg-danger':true};
		}
	}

	getBuildingData() {
	  this.dataService.getBuilding()
	  .then(BuildingLists => {
	  	this.BuildingLists = BuildingLists;
	  	this.BuildingLists_updated = true;
	  	});
	}
	
	getNeiborhoodData() {
	  this.dataService.getNeiborhood()
	  .then(Neiborhoodlists => {
	  	this.Neiborhoodlists = Neiborhoodlists.map((value, i) => {
                    let concat: string;
                    concat = value.City + ', ' + value.Region;
                    return ({
                    		Region: concat,
                    		Code: value.Code
                    	});
                });
	  	this.Neiborhoodlists_updated = true;
	  });
	}
	
	getInterestData() {
	  this.dataService.getInterest()
	  .then(InterestRates => {
	  	this.InterestRates = InterestRates;
	  	this.InterestRates_updated = true;
	  });
	}

	getDefaultValue() {
	  this.dataService.getDefaultValue()
	  .then(defaultValue => {
	  	this.defaultValue = defaultValue;
	  });
	}

	ngOnInit() {
	    this.getBuildingData();
	    this.getNeiborhoodData();
	    this.getInterestData();
	    this.getDefaultValue();
  }

  onSubmit() { 
  	console.log("Starting calculation");
  	let nbrPmtPerYear = 12;
  	let principal = this.defaultValue.houseValue * (1- (this.defaultValue.downPayment/100 - this.defaultValue.oneTimeExpenses/100));
  	let monthIntRate = this.defaultValue.intRate / nbrPmtPerYear / 100;
  	let fixExpRatio = this.defaultValue.fixExpenses / nbrPmtPerYear / 100;
  	let nbrPer = this.defaultValue.nbrYears * nbrPmtPerYear;
  	let pmt = this.mathProcessor.calculateThePV(principal, monthIntRate, nbrPer);
  	let rentIncome = this.defaultValue.nbrAppartment * this.defaultValue.averageRent;
  	let {houseValue, houseYearlyPriceIncrease, longTermInvestmentReturnRate, rentIncreaseRate} = this.defaultValue;

  	this.mortgateTable = [{
  	  period: 0,
  	  houseValue: houseValue,
  	  mortgateValue : principal,
  	  pmt: pmt,
  	  interest: 0,
  	  rentIncome: rentIncome,
  	  fixExpenses: 0,
  	  totalPmt: 0
  	}];
  	
  	this.mortgateTable = this.mathProcessor.buildMortgageTable(this.mortgateTable, fixExpRatio, monthIntRate, pmt, houseYearlyPriceIncrease, rentIncreaseRate);
  	this.mortgateTable.shift(); //Removign the initial element since they will be display as a summary somewhere else.

  	// calculating the current value of the investment
  	this.calcParam = {
        mortgage: principal,
        downPayment: this.defaultValue.houseValue*(this.defaultValue.downPayment - this.defaultValue.oneTimeExpenses)/100,
        pmt: pmt,
        initialLoanMoney: this.defaultValue.houseValue*this.defaultValue.downPayment/100,
        currentValue: this.mathProcessor.getInvestmentReturnValue(this.mortgateTable, 1+longTermInvestmentReturnRate/100/nbrPmtPerYear)
      }
  	// console.log(this.calcParam);
  }

}