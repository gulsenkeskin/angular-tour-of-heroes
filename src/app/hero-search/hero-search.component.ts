import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;

  //bir Subject hem observable değerin kaynağı hem de bir observable'ın kendisidir. //her hangi bir observable da olduğu gibi bir subjecte de suubscribe olunabilir.
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  //arama terimmini observable stream e aktarma
  //next(value) methodu ile bir observable a değer aktarılavilir
  search(term: string): void {
    this.searchTerms.next(term); //parametre olarak gelen terimi searchTerms e atar
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      //her tuş vuruşundan sonra 300 ms bekler
      debounceTime(300),
      //önceki terimle aynıysa yeni terimi yok sayar
      distinctUntilChanged(),
      // terim her değiştiğinde searchHeroes methodu çağrılır
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

}
