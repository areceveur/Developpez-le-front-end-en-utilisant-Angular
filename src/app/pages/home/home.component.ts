import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { olympicsCountry } from 'src/app/core/models/Olympic';
import { participations } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartComponent, ApexNonAxisChartSeries, ApexResponsive, ApexChart } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: string[];
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //@Input() olympicsCountry!: olympicsCountry;
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: ChartOptions;

  countries: olympicsCountry[] = [];

  constructor(private olympicService: OlympicService) {}


  ngOnInit(): void {
    this.olympicService.loadInitialData().subscribe((data: olympicsCountry[]) => {
      console.log('Data received:', data);
      
      this.countries = data;
      
      const seriesData = data.map(country => this.getTotalMedals(country.participations));
      const labelsData = data.map(country => country.country);
      
      console.log('Series data:', seriesData); // Ajouter cette ligne pour vérifier les données de la série
      console.log('Labels data:', labelsData); // Ajouter cette ligne pour vérifier les labels


      this.chartOptions = {
        series: seriesData,
        chart: {
          width: 380,
          type: "pie"
        },
        labels: labelsData,
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
      };
    });
  }

  getTotalMedals(participations: participations[]): number {
    return participations.reduce((total, participation) => total + participation.medalsCount, 0);
  }
}
