import { Component, OnInit, Input } from '@angular/core';
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
  public olympics$: Observable<olympicsCountry[]> = this.olympicService.countries;
  public medals$: Observable<participations[]> = this.olympicService.medals;
  //country!: any;

  /*public olympics$: any;
  olympicsCountries!: olympicsCountry[];*/

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    //this.olympics$ = this.olympicService.getOlympics();

    this.olympicService.loadInitialData();
    this.olympicService.loadParticipationData();
  }
}
