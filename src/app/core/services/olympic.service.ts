import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { olympicsCountry } from '../models/Olympic';
import { participations } from '../models/Participation';


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
        throw new Error("Somethong went wrong. Please try again later");
    }));
  }

  getTotalMedals(participations: participations[]): number {
    return participations.reduce((total, participation) => total + participation.medalsCount, 0);
  }

  getTotalAthletes(participations: participations[]): number {
    return participations.reduce((total, participation) => total + participation.athleteCount, 0);
  }

  getCountryId(countryId: number): Observable<olympicsCountry> {
    return this.loadInitialData().pipe(
      map((data: olympicsCountry[]) => {
        const Id = data.find(Id => Id.id === countryId);
        if (!Id) {
          throw new Error('Country not found!');
        }
        return Id;
      })
    );
  }

  getNumberOfJO(countryId: number): Observable<number> {
    return this.getCountryId(countryId).pipe(
      map(country => country ? country.participations.length : 0)
    );
  }

  getMedalAndAthleteCount(countryId: number): Observable<{ medals: number, athletes: number }> {
    return this.getCountryId(countryId).pipe(
      map(country => {
        if (country) {
          const medals = this.getTotalMedals(country.participations);
          const athletes = this.getTotalAthletes(country.participations);
          return { medals, athletes };
        }
        return { medals: 0, athletes: 0 };
      })
    );
  }

}
