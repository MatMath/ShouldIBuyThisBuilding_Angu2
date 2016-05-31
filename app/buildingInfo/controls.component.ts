import { Component, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

import { BuildingList, NeiborhoodAutocomplete, InterestRate, DefaultValue} from '../fallbackData/data-structure';
import { DataService } from '../data.services';
import { autocompleteComponent } from '../shared/autocomplete.component'

@Component({
  selector: 'my-controls',
  templateUrl: `app/buildingInfo/controls.component.html`,
  styleUrls: ['app/buildingInfo/controls.component.css'],
  directives: [NgClass, NgIf, autocompleteComponent]
})
export class ControlsComponent implements OnInit {
	BuildingLists: BuildingList[];
	Neiborhoodlists: NeiborhoodAutocomplete[];
	InterestRates: InterestRate[];
	defaultValue: DefaultValue;

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
  }

}