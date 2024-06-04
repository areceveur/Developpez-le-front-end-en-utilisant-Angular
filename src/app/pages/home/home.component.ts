import { Component, OnInit, OnDestroy } from '@angular/core';
import { olympicsCountry } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { pieChart } from 'src/app/core/models/Chart';
import { Subject, Subscriber, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  chartOptions: pieChart[] = [];
  countries: olympicsCountry[] = [];
  private destroy$!: Subject<boolean>;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
      this.olympicService.loadInitialData().subscribe((data: olympicsCountry[]) => {
      takeUntil(this.destroy$);
        this.countries = data;
      this.renderChart();

    })
  }

  renderChart(): void {
    this.chartOptions = this.countries.map(country => ({
      name: country.country,
      value: this.olympicService.getTotalMedals(country.participations)
    }));
  }
  
  onSelect(event: any) {
    console.log(event);
  }

  ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.complete();
  }

}
