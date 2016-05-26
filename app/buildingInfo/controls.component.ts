import { Component, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

import { BuildingList, Neiborhoodlist, InterestRate, DefaultValue} from '../fallbackData/data-structure';
import { DataService } from '../data.services';

@Component({
  selector: 'my-controls',
  templateUrl: `app/buildingInfo/controls.component.html`,
  directives: [NgClass, NgIf]
})
export class ControlsComponent implements OnInit {
	BuildingLists: BuildingList[];
	Neiborhoodlists: Neiborhoodlist[];
	InterestRates: InterestRate[];
	defaultValue: DefaultValue;

	// Later this will be a indicator if we have the default/fallback or the HTTP request data.
	BuildingLists_updated: boolean = false;
	Neiborhoodlists_updated: boolean = false;
	InterestRates_updated: boolean = false;


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
	  	this.Neiborhoodlists = Neiborhoodlists;
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

}