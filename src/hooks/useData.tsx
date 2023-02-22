import { useEffect, useState } from "react";
import { endpoints } from "../constants";
import { taxData } from "../types";

const useData = (year: string) => {
  const taxRateEndpoint = `${endpoints.TAX_BRACKET}/${year}`;
  const [taxRates, setTaxRates] = useState<taxData>();
  useEffect(() => {
    const dataFetch = async () => {
      const data: taxData = await (await fetch(taxRateEndpoint)).json();
      setTaxRates(data);
    };
    dataFetch();
  }, [year]);

  return { data: taxRates };
};

export default useData;
