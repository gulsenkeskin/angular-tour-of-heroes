import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  // getHeroes():Hero[]{
  //   return HEROES;
  // }


  //UYGULAMA MESSAGEsERVİCE İ ÇOK ÇAĞIRDIĞINDAN ONU BİR LOG METHODUNA SARMAK DOĞRU OLUR.
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  //http client ile kahramanları listelemek //sahte sunucudan veri listeleme
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl);
  }


  /*
    //asynchronous signature.
    getHeroes(): Observable<Hero[]> {
      //of(HEROES), sahte kahramanlar dizisi olan tek bir değer yayan bir Observable<Hero[]> döndürür.
      const heroes = of(HEROES);
  
      //servis içi servis kullanımı:
      // this.messageService.add('HeroService: fetched heroes');
  
      return heroes;
    }
  */

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero); //of heroyu observable olarak döndürür
  }

}


//Componentler verileri doğrudan almamalı veya kaydetmemeli ve kesinlikle bilerek sahte veriler sunmamalıdır. Veri sunmaya odaklanmalı ve bir servise veri erişimi yetkisi vermelidirler.