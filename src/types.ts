export interface taxBrackets {
  max?: number;
  min: number;
  rate: number;
}

export interface taxBracket {
  rate: number;
  total: number;
}

export interface errors {
    code: string;
    field: string;
    message: string;
}

export interface taxData {
  tax_brackets?: Array<taxBrackets>;
  errors?: Array<errors>;
}