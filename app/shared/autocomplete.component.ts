import {Component, ElementRef, Input} from '@angular/core';

import { NeiborhoodAutocomplete } from '../fallbackData/data-structure';
// Highly influences by http://4dev.tech/2016/03/tutorial-creating-an-angular2-autocomplete/

// Improvement to do: 
// - Can make it more generic with Input array and Selected object
// - Allow Moving Up-Down with the keyboard arrow key

@Component({
    selector: 'my-autocomplete',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    templateUrl: 'app/shared/autocomplete.component.html'
})

export class autocompleteComponent {
    public query = '';
    public filteredList = [];
    public elementRef;
    // public neiborhoodCode: string;

    constructor(myElement: ElementRef) {
        this.elementRef = myElement;
    }

    @Input() neiborhoodlist: NeiborhoodAutocomplete[];
    @Input() selectedNeiborhood: NeiborhoodAutocomplete;

    filter() {
        if (this.query !== "") {
            this.filteredList = this.neiborhoodlist.filter(function(el){
                return el.Region.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.filteredList = [];
        }
    }

    select(item){
        this.query = item.Region;
        // if I use this.selectedNeiborhood = item; it seems to lose the reference, To check later if I make it generic.
        this.selectedNeiborhood.Code = item.Code;
        this.selectedNeiborhood.Region = item.Region;
        this.filteredList = [];
    }

    handleClick(event){
       var clickedComponent = event.target;
       var inside = false;
       do {
           if (clickedComponent === this.elementRef.nativeElement) {
               inside = true;
           }
          clickedComponent = clickedComponent.parentNode;
       } while (clickedComponent);
        if(!inside){
            this.filteredList = [];
        }
    }
}