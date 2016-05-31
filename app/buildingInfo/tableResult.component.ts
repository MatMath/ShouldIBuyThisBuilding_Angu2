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
 console.log(mortgateTable);

}