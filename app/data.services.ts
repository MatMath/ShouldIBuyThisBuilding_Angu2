import { Injectable } from '@angular/core';

import { BuildingList, Neiborhoodlist, InterestRate} from './fallbackData/data-structure';
import { FallBackBuildingType, FallBackNeiborhood, FallbBackInterest } from './fallbackData/fallback-data.service';

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
}
