import { useEffect, useState } from "react";
import { endpoints } from "../constants";
import { taxData } from "../types";

const useData = (year: string) => {
    const taxRateEndpoint = `${endpoints.TAX_BRACKET}/${year}`;
    const [taxRates, setTaxRates] = useState<taxData>();
    useEffect(() => {
    const dataFetch = async () => {
      const data: taxData = await (await fetch(taxRateEndpoint)).json();
      if(data.errors && data.errors.length >0){
        return {data}
      }
      setTaxRates(data);
    };
    dataFetch();
  }, [taxRateEndpoint]);

  return {data: taxRates}
}

export default useData