import { Component, OnInit, OnDestroy } from '@angular/core';
import { olympicsCountry } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { pieChart } from 'src/app/core/models/Chart';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
  chartOptions: pieChart[] = [];
  countries: olympicsCountry[] = [];
  private destroy$ = new Subject<boolean>();
  countryId = 1;
  numberOfOlympics!: number;

  constructor(private olympicService: OlympicService,
    private router: Router) {}

  ngOnInit(): void {
      this.olympicService.loadInitialData().pipe(takeUntil(this.destroy$)).
      subscribe((data: olympicsCountry[]) => {
      this.countries = data;
      this.renderChart();
    })
    this.olympicService.getNumberOfJO(this.countryId).pipe(takeUntil(this.destroy$))
      .subscribe(number => {
          this.numberOfOlympics = number;
      });
  }

  renderChart(): void {
    this.chartOptions = this.countries.map(country => ({
      id: country.id,
      name: country.country,
      value: this.olympicService.getTotalMedals(country.participations)
    }));
  }
  
  onSelect(event: {name: string} ): void {
    const country = this.countries.find(country => country.country === event.name);
    if (country) {  
      this.router.navigate(['/detail', country.id]);
    }
  }

  ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.complete();
  }

}
