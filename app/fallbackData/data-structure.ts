export class BuildingList {
	Title: string;
	Appartment: number;
	RevenuPerApp: number;
}


export class Neiborhoodlist {
	Region: string;
	State: string;
	Metro: string;
	County: string;
	City: string;
	Code: string;
}

export class NeiborhoodAutocomplete {
	Region: string;
	Code: string;
}

export class InterestRate {
	DB: string;
	name: string;
	latestIntRate: number;
}

export class DefaultValue {
  houseValue: number;
  houseYearlyPriceIncrease: number;
  longTermInvestmentReturnRate: number;
  rentIncreaseRate: number;
  downPayment: number;
  intRate: number;
  fixExpenses: number;
  oneTimeExpenses: number;
  nbrAppartment: number;
  averageRent: number;
  selectedNeiborhood: NeiborhoodAutocomplete;
  nbrYears: number;
}

export class MortgateTable {
	period: number;
	houseValue: number;
	mortgateValue : number;
	pmt: number;
	interest: number;
	rentIncome: number;
	fixExpenses: number;
	totalPmt: number;
}

export class CalcParam {
	mortgage: number;
	downPayment: number;
	pmt: number;
	initialLoanMoney: number;
	currentValue: number;
}