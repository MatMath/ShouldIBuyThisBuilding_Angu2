import { BuildingList, Neiborhoodlist, InterestRate, DefaultValue} from './data-structure';

export var FallBackBuildingType: BuildingList[] = [
  {Title:'House',Appartment:1,RevenuPerApp:0},
  {Title:'Duplex',Appartment:2,RevenuPerApp:0},
  {Title:'Triplex',Appartment:3,RevenuPerApp:0},
  {Title:'Fourplex',Appartment:4,RevenuPerApp:0}
];

export var FallBackNeiborhood: Neiborhoodlist[] = [
  {Region:'Paradise',State:'Las Vegas',Metro:'NV',County:'Las Vegas',City:'Clark',Code:'00001'},
  {Region:'Upper West Side',State:'New York',Metro:'NY',County:'New York',City:'New York',Code:'00002'},
  {Region:'South Los Angeles',State:'Los Angeles',Metro:'CA',County:'Los Angeles',City:'Los Angeles',Code:'00003'}
];

export var FallbBackInterest: InterestRate[] = [
  {'DB':'5US','name':'5/1-Year Adjustable Rate Mortgage Average in the United States','latestIntRate':2.78},
  {'DB':'15US','name':'15-Year Fixed Rate Mortgage Average in the United States','latestIntRate':2.81},
  {'DB':'30US','name':'30-Year Fixed Rate Mortgage Average in the United States','latestIntRate':3.57},
  {'DB':'WRMORTG','name':'30-Year Conventional Mortgage Rate','latestIntRate':3.61}
];

// Later this DefaultValue could come from a Database where you can save different scenario.
export var startDefaultValue: DefaultValue = {
      houseValue: 500000,
      houseYearlyPriceIncrease: 3,
      longTermInvestmentReturnRate: 7,
      rentIncreaseRate: 1.5,
      downPayment: 10,
      intRate: 3,
      fixExpenses: 1.75,
      oneTimeExpenses: 1.25,
      nbrAppartment: 1,
      averageRent:1900,
      neiborhoodName: '',
      neiborhoodCode: '',
      nbrYears: 25
};