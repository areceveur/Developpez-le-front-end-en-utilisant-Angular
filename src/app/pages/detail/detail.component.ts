import { Component, OnInit, OnDestroy } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Subject, takeUntil } from 'rxjs';
import { olympicsCountry } from 'src/app/core/models/Olympic';
import { lineChart } from 'src/app/core/models/Chart';
import { participations } from 'src/app/core/models/Participation';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  chartOptions: lineChart[] = [];
  participations: olympicsCountry[] = [];
  idCountry!: number;
  private destroy$!: Subject<boolean>;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.olympicService.loadInitialData().subscribe((data: olympicsCountry[]) => {
      takeUntil(this.destroy$);
      this.participations = data;
      this.renderChart();
    })

  }

  renderChart(): void {
    this.chartOptions = this.participations.map(data => ({
      date: data.participations.map(yearTime => yearTime.year),
      participation: data.participations.map(allMedals => allMedals.medalsCount),
    }))
  }
  
  onSelect(event: any) {
    console.log(event);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
