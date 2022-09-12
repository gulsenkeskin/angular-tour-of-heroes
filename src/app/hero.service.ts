import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import { Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  // getHeroes():Hero[]{
  //   return HEROES;
  // }

  //asenkron fonk
  getHeroes():Observable<Hero[]>{
    const heroes=of(HEROES);
    return heroes;

    // of(HEROES), mock heroes dizisi olan tek bir değer yayan bir Observable<Hero[]> döndürür.
  }
}


//Componentler verileri doğrudan almamalı veya kaydetmemeli ve kesinlikle bilerek sahte veriler sunmamalıdır. Veri sunmaya odaklanmalı ve bir servise veri erişimi yetkisi vermelidirler.