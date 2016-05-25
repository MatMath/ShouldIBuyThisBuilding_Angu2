import { Component, OnInit } from '@angular/core';

import { BuildingList, Neiborhoodlist, InterestRate} from '../fallbackData/data-structure';
import { DataService } from '../data.services';

@Component({
  selector: 'my-controls',
  templateUrl: `app/buildingInfo/controls.component.html`
})
export class ControlsComponent implements OnInit {
	BuildingLists: BuildingList[];
	Neiborhoodlists: Neiborhoodlist[];
	InterestRates: InterestRate[];

	constructor(
	  private dataService: DataService) { }

	getBuildingData() {
	  this.dataService.getBuilding()
	  .then(BuildingLists => this.BuildingLists = BuildingLists);
	}
	getNeiborhoodData() {
	  this.dataService.getNeiborhood()
	  .then(Neiborhoodlists => this.Neiborhoodlists = Neiborhoodlists);
	}
	getInterestData() {
	  this.dataService.getInterest()
	  .then(InterestRates => this.InterestRates = InterestRates);
	}

	ngOnInit() {
	    this.getBuildingData();
	    this.getNeiborhoodData();
	    this.getInterestData();
  }

}