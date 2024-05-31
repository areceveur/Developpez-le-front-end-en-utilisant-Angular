import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { olympicsCountry } from '../models/Olympic';
import { participations } from '../models/Participation';

@Injectable({
  providedIn: 'root',
})

export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<olympicsCountry[]>([]);
  private participations$ = new BehaviorSubject<participations[]>([]);
  public countries: Observable<olympicsCountry[]> = this.olympics$.asObservable();
  public medals: Observable<participations[]> = this.participations$.asObservable();


  /*olympic: olympicsCountry[] = [];
  participation: participations[] = [];*/


  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<olympicsCountry[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.olympics$.next(value);
        this.participations$.next([]);
      }),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        return caught;
      }),
    );
  }

  /*loadParticipationData() {
    return this.http.get<participations[]>(this.olympicUrl).pipe(
      tap((value) => this.participations$.next(value)),
      catchError((error, caught) => {
        console.error(error);
        return caught;
      }),
      map((medals) => {
        return medals;
      })
    );
  }*/


  getOlympics() {
    return this.countries;
  }

  getMedals() {
    return this.medals;
  }
}
