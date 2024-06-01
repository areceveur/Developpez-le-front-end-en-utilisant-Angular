export interface DataPoint {
  y: number;
  label: string;
}


export interface ChartOptions {
    animationEnabled: boolean;
    title: {
      text: string;
    };
    data: [
      {
        type: string;
        startAngle: number;
        indexLabel: string;
        yValueFormatString: string;
        dataPoints: DataPoint[];
      }
    ];
  }