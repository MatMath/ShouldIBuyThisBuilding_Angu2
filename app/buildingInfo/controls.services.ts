import { Injectable } from '@angular/core';

import { MortgateTable } from '../fallbackData/data-structure';


@Injectable()
export class MathProcessor {
  buildMortgageTable (tablePmt: MortgateTable[], fixExpRatio: number, monthIntRate: number, pmt: number, houseYearlyPriceIncrease: number, rentIncreaseRate: number) {
    // One of many website that give formulas for compound interest: https://en.wikipedia.org/wiki/Compound_interest#Monthly_amortized_loan_or_mortgage_payments
    // Note: https://github.com/cristobal-io/mortgage-calculator give awesome API, but not exactly what I need.
    const perr = tablePmt.length;
    let {mortgateValue, houseValue, rentIncome} = tablePmt[perr-1];
    if (perr%12 === 0) {
      // Every year we increase the rent of 1.5% --> To extract from Quandl maybe.
      rentIncome *= (1 + rentIncreaseRate/100);
      houseValue *= (1 + houseYearlyPriceIncrease/100);
    }
    mortgateValue = mortgateValue * (1+monthIntRate) - pmt;
    //HouseValue increase could be extracted historically from Quandl
    const itemToPush = {
      period: perr,
      houseValue: houseValue,
      mortgateValue : mortgateValue,
      pmt: pmt,
      interest: mortgateValue * monthIntRate,
      rentIncome: rentIncome,
      fixExpenses: houseValue*fixExpRatio,
      totalPmt: pmt + houseValue*fixExpRatio - rentIncome
    };

    if (mortgateValue > 0 && perr < 500) {
      tablePmt.push(itemToPush);
      return this.buildMortgageTable(tablePmt, fixExpRatio, monthIntRate, pmt, houseYearlyPriceIncrease, rentIncreaseRate);
    } else {
      return tablePmt;
    }
  }

  calculateThePV (principal: number, monthIntRate: number, nbrPer: number) {
    return (principal*monthIntRate)/(1-1/Math.pow((1+monthIntRate),nbrPer));
  }

  getInvestmentReturnValue(arrayToReduce: MortgateTable[], reducingFactor: number) {
    // How it work: We take everything we pay over time and make it as today value.
    // We take how much we can sell the building at the end and transpose it as today value.
    // The reducingFactor need to match the current period.
    interface ValueToReduce {
      totalPmt:number,
      period: number
    }

    let totalPaidInCurrentValue:number = arrayToReduce.reduce((previousValue:number, currentValue:MortgateTable):number => {
      
      let oldValue:number = previousValue;
      let newValue:number = currentValue.totalPmt * Math.pow((1/reducingFactor),currentValue.period);
      return oldValue+newValue;
    }, 0);

    let lastItem = arrayToReduce.pop();
    let totalReceiveInTheFuture = lastItem.houseValue * Math.pow((1/reducingFactor),lastItem.period);
    return totalReceiveInTheFuture - totalPaidInCurrentValue;
  }
}