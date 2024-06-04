import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { olympicsCountry } from '../models/Olympic';
import { participations } from '../models/Participation';
import { lineChart } from 'src/app/core/models/Chart';


@Injectable({
  providedIn: 'root',
})

export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  participations = [];
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

  getTotalMedals(participations: participations[]): number {
    return participations.reduce((total, participation) => total + participation.medalsCount, 0);
  }

}
