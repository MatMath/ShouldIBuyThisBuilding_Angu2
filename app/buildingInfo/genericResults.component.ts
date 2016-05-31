import { Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

import { CalcParam } from '../fallbackData/data-structure';

@Component ({
	selector: 'generic-results',
	templateUrl: 'app/buildingInfo/genericResults.component.html',
	directives: [NgClass, NgIf]
})

export class GenericResults {

	@Input() calcParam : CalcParam;
}