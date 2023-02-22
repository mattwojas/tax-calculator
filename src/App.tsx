import React, { useCallback, useEffect, useState } from "react";
import "./styles/App.scss";
import EffectiveRate from "./components/EffectiveRate";
import Header from "./components/header";
import IncomeForm from "./components/IncomeForm";
import TaxesOwed from "./components/TaxesOwed";
import TaxesPerBracket from "./components/TaxesPerBracket";
import YearSelect from "./components/YearSelect";
import useData from "./hooks/useData";
import { taxBracket } from "./types";

function App() {
  const [year, setYear] = useState("2020");
  const [owed, setOwed] = useState(0);
  const [income, setIncome] = useState(0);
  const [formError, setFormError] = useState(false);
  const [effectiveRate, setEffectiveRate] = useState(0);
  const { data } = useData(year);
  const [bracketsOwed, setBracketsOwed] = useState(
    new Map<number, taxBracket>()
  );

  const getTaxesOwed = useCallback(() => {
    if (!data) return <div>loading...</div>;

    let total = 0;
    // Reset bracket map for fresh calculations
    bracketsOwed.clear();
    data.tax_brackets?.forEach((bracket, i) => {
      if (bracket.max) {
        if (income > bracket.max) {
          const applicableNum = bracket.max - bracket.min;
          const bracketTaxesOwed = applicableNum * bracket.rate;
          total = total + bracketTaxesOwed;
          setBracketsOwed(
            bracketsOwed.set(i, { rate: bracket.rate, total: bracketTaxesOwed })
          );
        } else if (income < bracket.max && income > bracket.min) {
          const difference = income - bracket.min;
          const lastBracketAmount = difference * bracket.rate;
          total = total + lastBracketAmount;
          setBracketsOwed(
            bracketsOwed.set(i, {
              rate: bracket.rate,
              total: lastBracketAmount,
            })
          );
          return;
        } else if (income < bracket.min) {
          return;
        }
      } else if (!bracket.max && income > bracket.min) {
        const difference = income - bracket.min;
        const lastBracketAmount = difference * bracket.rate;
        total = total + lastBracketAmount;
        setBracketsOwed(
          bracketsOwed.set(i, { rate: bracket.rate, total: lastBracketAmount })
        );
      }
    });
    setOwed(total);
  }, [income, bracketsOwed, data]);

  const getEffectiveRate = useCallback(() => {
    const eRate = (owed / income) * 100;
    setEffectiveRate(eRate);
  }, [owed, income]);

  const calculateTaxes = (e: any) => {
    e.preventDefault();
    const income = e.target.elements.income.value;
    if (!income || income <=0) {
      setFormError(true);
    }
    setIncome(income);
  };

  const handleYearChange = (e: any) => {
    setYear(e.target.value);
  };

  const onFormChange = () => {
    setFormError(false);
  };

  useEffect(() => {
    getTaxesOwed();
  }, [income, getTaxesOwed]);

  useEffect(() => {
    getEffectiveRate();
  }, [owed, getEffectiveRate]);

  return (
    <div className="App container">
      <div className="row v_space">
        <div className="col">
          <Header />
        </div>
      </div>
      <main id="main">
        <section>
          <div className="row v_space">
            <div className="col">
              <YearSelect onChange={handleYearChange} />
            </div>
          </div>
          <div className="row v_space">
            <div className="col">
              <IncomeForm
                onSubmit={calculateTaxes}
                onChange={onFormChange}
                formError={formError}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-lg-4 v_space">
              <TaxesOwed owed={owed} />
            </div>
            <div className="col-xs-12 col-lg-4 v_space">
              <TaxesPerBracket bracketsOwed={bracketsOwed} />
            </div>
            <div className="col-xs-12 col-lg-4 v_space">
              <EffectiveRate effectiveRate={effectiveRate} placeholder="0%" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
