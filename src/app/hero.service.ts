import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  // getHeroes():Hero[]{
  //   return HEROES;
  // }

  //asynchronous signature.
  getHeroes(): Observable<Hero[]> {

    //of(HEROES), sahte kahramanlar dizisi olan tek bir değer yayan bir Observable<Hero[]> döndürür.
    const heroes = of(HEROES);

    //servis içi servis kullanımı:
    this.messageService.add('HeroService: fetched heroes');
    return heroes;

  }


  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero); //of heroyu observable olarak döndürür
  }

}


//Componentler verileri doğrudan almamalı veya kaydetmemeli ve kesinlikle bilerek sahte veriler sunmamalıdır. Veri sunmaya odaklanmalı ve bir servise veri erişimi yetkisi vermelidirler.