import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { olympicsCountry } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Input() olympicsCountry!: olympicsCountry;
  public olympics$: Observable<any> = of(null);
  olympicsCountries!: olympicsCountry[];

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympicsCountries = this.olympicService.getAllCountries();
  }
}
