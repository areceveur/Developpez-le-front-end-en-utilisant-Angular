export interface pieChart {
    name: string;
    value: number;
  };

  export interface lineChart {
    name: string;
    series: {
      name: string;
      value: number;
    }[]
  }