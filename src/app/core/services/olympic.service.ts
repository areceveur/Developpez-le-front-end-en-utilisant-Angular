import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { olympicsCountry } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})

export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);

  olympic: olympicsCountry[] = [
    {
      id: 1,
      country: "Italy"
    },
    {
      id: 2,
      country: "Spain"
    },
    {
      id: 3,
      country: "United States"
    },
    {
      id: 4,
      country: "Germany"
    },
    {
      id: 5,
      country: "France"
    }

  ];

  getAllCountries(): olympicsCountry[] {
    return this.olympic;
  }

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  

}
