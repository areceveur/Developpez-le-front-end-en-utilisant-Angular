import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { olympicsCountry } from 'src/app/core/models/Olympic';
import { participations } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartOptions } from 'src/app/core/models/Chart';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //@Input() olympicsCountry!: olympicsCountry;
  //@ViewChild('chart') chart!: ChartComponent;
  chartOptions!: ChartOptions;

  countries: olympicsCountry[] = [];

  constructor(private olympicService: OlympicService) {}


  ngOnInit(): void {
    this.olympicService.getChartOptions().subscribe((chartOptions: ChartOptions) => {
      this.chartOptions = chartOptions;
  });

    this.olympicService.loadInitialData().subscribe((data: olympicsCountry[]) => {
      this.countries = data;
    })
  }

  
}
