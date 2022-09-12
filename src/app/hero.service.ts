import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  getHeroes():Hero[]{
    return HEROES;
  }
}


//Componentler verileri doğrudan almamalı veya kaydetmemeli ve kesinlikle bilerek sahte veriler sunmamalıdır. Veri sunmaya odaklanmalı ve bir servise veri erişimi yetkisi vermelidirler.