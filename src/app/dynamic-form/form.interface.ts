export interface IForm {
    type: string;
    label: string;
    name: string;
    value: string | number | boolean;
    options?: { label: string; value: number | string | boolean, mapping?: string }[];
    validations?: {
      name: string;
      validator: string;
      message: string;
    }[];
  }
