import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { olympicsCountry } from '../models/Olympic';
import { participations } from '../models/Participation';
import { ChartOptions, DataPoint } from 'src/app/core/models/Chart';


@Injectable({
  providedIn: 'root',
})



export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<olympicsCountry[]> {
    return this.http.get<olympicsCountry[]>(this.olympicUrl).pipe(
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        return caught;
    }));
  }
    
  getChartOptions(): Observable<ChartOptions> {
    return this.loadInitialData().pipe(
      map((data: olympicsCountry[]) => {
        const dataPoints: DataPoint[] = data.map(country => ({
          y: this.getTotalMedals(country.participations),
          label: country.country
        }));
        return {
          animationEnabled: true,
          title: {
            text: "Olympic Medals by Country"
          },
          data: [{
            type: "pie",
            startAngle: -90,
            indexLabel: "{label}: {y}",
            yValueFormatString: "#,###.##",
            dataPoints: dataPoints
          }]
        };
      })
    )
  }

  getTotalMedals(participations: participations[]): number {
    return participations.reduce((total, participation) => total + participation.medalsCount, 0);
  }

}
