import { Injectable } from '@angular/core';

import { BuildingList, Neiborhoodlist, InterestRate, DefaultValue} from './fallbackData/data-structure';
import { FallBackBuildingType, FallBackNeiborhood, FallbBackInterest, startDefaultValue } from './fallbackData/fallback-data.service';

@Injectable()
export class DataService {
  getBuilding() {
    return Promise.resolve(FallBackBuildingType);
  };

  getNeiborhood() {
    return Promise.resolve(FallBackNeiborhood);
  };

  getInterest() {
    return Promise.resolve(FallbBackInterest);
  };

  getDefaultValue() {
  	return Promise.resolve(startDefaultValue);
  }
}
