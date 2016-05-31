import { Component, Input} from '@angular/core';
import { NgClass, NgIf, NgFor} from '@angular/common';

import { MortgateTable } from '../fallbackData/data-structure';

@Component({
  selector: 'table-result',
  templateUrl: `app/buildingInfo/tableResult.component.html`,
  directives: [NgClass, NgIf, NgFor]
})

export class TableResultComponent {
 constructor(){}

 @Input() mortgateTable: MortgateTable[];
 
 listStart: number = 0;
 listEnd: number = 5;

 scrollUpOrDownTheList (currentIndexLocation:number) {
 	// I could trottle it so it look less glitchy, but I like when it goes fast. :)
 	if(currentIndexLocation <= 1 || currentIndexLocation > this.mortgateTable.length) {
 		// At the outside boundry so do nothing
 		return;
 	}

	if(currentIndexLocation === this.listStart + 1){
		// I am overing on top of the Top row, so I want to go up.
		this.listEnd --;
		this.listStart --;
	} else if(currentIndexLocation === this.listEnd) {
		// I am at the end row so scroll down.
		this.listEnd ++;
		this.listStart ++;
	}
 }

 setClassIfInitOrLast(indexAt:number, max:number) {
 	if(indexAt <= 1 || indexAt === max) {
	 	return {'bg-info':true};
 	}
 }

}