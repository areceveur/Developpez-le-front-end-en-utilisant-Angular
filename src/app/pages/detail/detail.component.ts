import { Component, OnInit, OnDestroy } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Subject, count, takeUntil } from 'rxjs';
import { olympicsCountry } from 'src/app/core/models/Olympic';
import { lineChart } from 'src/app/core/models/Chart';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  chartOptions: lineChart[] = [];
  private destroy$ = new Subject<boolean>();
  country!: olympicsCountry;

  constructor(private olympicService: OlympicService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const countryId = +this.route.snapshot.params['id'];
    this.olympicService.getCountryId(countryId).pipe(takeUntil(this.destroy$)).subscribe((country: olympicsCountry) => {
        console.log(country.country)
        this.country = country;
        this.renderChart();
    });
  }


  renderChart(): void {
    this.chartOptions = [{
      name: this.country.country,
      series: this.country.participations.map(series => ({
        name: series.year.toString(),
        value: series.medalsCount
      }))
    }];
    console.log(this.chartOptions);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
