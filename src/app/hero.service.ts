import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  //* getHeroes():Hero[]{
  //*   return HEROES;
  //* }


  //?UYGULAMA MESSAGEsERVİCE İ ÇOK ÇAĞIRDIĞINDAN ONU BİR LOG METHODUNA SARMAK DOĞRU OLUR.
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }



  //?http client ile kahramanları listelemek //sahte sunucudan veri listeleme

  //?HeroService yöntemleri, observable değerlerin akışından yararlanır ve log() yöntemini kullanarak sayfanın altındaki mesaj alanına bir mesaj gönderir. RxJS tap() operatörü, gözlemlenebilir değerlere bakarak, bu değerlerle bir şeyler yaparak ve bunları ileterek bu yeteneği sağlar. tap() geri çağrısı, değerlerin kendilerine erişmez.

  getHeroes(): Observable<Hero[]> {
    //!hata yakalama için cath error pipe'ının kullanımı
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', [])
      )
    );

    //?catchError() operatörü, başarısız olan bir Observable'ı yakalar. Operatör daha sonra hatayı hata işleme fonksiyonuna iletir.

  }



  //! @param operation  - başarısız olan işlemin adı 
  //! @param result  - gözlemlenebilir sonuç olarak döndürülecek isteğe bağlı değer

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      //? kullanıcı için hatayı dönüştürme
      this.log(`${operation} failed: ${error.message}`);

      //? Boş bir sonuç döndürerek uygulamanın çalışmaya devam etmesine izin verin.

      return of(result as T);
    };


  }


  /*
    //*asynchronous signature.
    getHeroes(): Observable<Hero[]> {
      //*of(HEROES), sahte kahramanlar dizisi olan tek bir değer yayan bir Observable<Hero[]> döndürür.
      const heroes = of(HEROES);
  
      //*servis içi servis kullanımı:
      //* this.messageService.add('HeroService: fetched heroes');
  
      return heroes;
    }
  */

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url).pipe(map(heroes => heroes[0]), // bir {0|1} eleman dizisi döndürür
      tap(h => {
        const outcome = h ? 'fetched' : 'did not find';
        this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }



  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`gerHero id=${id}`))
    )
  }

  // //?server'a get isteği yapıyorMUŞ örneği :D
  //* getHero(id: number): Observable<Hero> {
  //*   const hero = HEROES.find(h => h.id === id)!;
  //*   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //*   return of(hero); //of heroyu observable olarak döndürür
  //* }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }



  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(tap((newHero: Hero) => this.log(`added hero w/id= ${newHero.id}`)), catchError(this.handleError<Hero>('addHero')));
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  // Get search heroes
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      //arama terimi boşsa boş arrey döner
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }


}


//? Componentler verileri doğrudan almamalı veya kaydetmemeli ve kesinlikle bilerek sahte veriler sunmamalıdır. Veri sunmaya odaklanmalı ve bir servise veri erişimi yetkisi vermelidirler.7


//?  Notlar
//? HttpClient methods return one value
//? All HttpClient methods return an RxJS Observable of something.
//? HTTP is a request/response protocol. You make a request, it returns a single response.

//? Genel olarak, bir observable  zaman içinde birden fazla değer döndürebilir. HttpClient'ten bir observable  her zaman tek bir değer yayar ve ardından bir daha asla yaymamak üzere tamamlanır.

//? HttpClient.get() işlevine yapılan bu özel çağrı, kahraman dizilerinin observable bir durumu olan bir Observable<Hero[]> döndürür. Pratikte, yalnızca tek bir kahraman dizisi döndürür.


//? HttpClient.get() returns response data
//? HttpClient.get(), response body'sini varsayılan olarak yazılmamış bir JSON nesnesi olarak döndürür

//? Diğer API'ler, istediğiniz verileri bir nesneye gömebilir. Observable  result'ı RxJS map() operatörüyle işleyerek bu verileri çıkarmanız gerekebilir.
