import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { olympicsCountry } from 'src/app/core/models/Olympic';
import { participations } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartComponent, ApexNonAxisChartSeries, ApexResponsive, ApexChart, ApexTheme, ApexTitleSubtitle } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  theme: ApexTheme;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //@Input() olympicsCountry!: olympicsCountry;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  public olympics$: Observable<olympicsCountry[]> = this.olympicService.getOlympics();
  public medals$: Observable<participations[]> = this.olympicService.getMedals();


  constructor(private olympicService: OlympicService) {
    this.chartOptions = {
      chart: {
        width: 380,
        type: "pie"
      },
      labels: this.olympics$,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }
  }

  ngOnInit(): void {
    //this.olympics$ = this.olympicService.getOlympics();
    this.olympics$;
    this.medals$;
  }
}
