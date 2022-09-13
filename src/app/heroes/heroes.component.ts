import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-heroes', //bileşenin seçicisi
  templateUrl: './heroes.component.html', //şablon dosya konumu
  styleUrls: ['../app.component.css']
  //bileşene özel css stil konumu 
})
export class HeroesComponent implements OnInit {
  selectedHero?: Hero;

  heroes: Hero[] = [];

  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // };

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  //bileşen oluşturulduktan kısa bir süre sonra çağrılır
  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  //eşzamanalı //uzak bir sunucudan istekte bulunulduğunda çalışmaz!
  // getHeroes(){
  //   this.heroes=this.heroService.getHeroes();
  // }

  //eşzamansız //sunucudan veri çekerken çalışır
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero).subscribe(hero => { this.heroes.push(hero); });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  //!Önemli
  //?subscribe() kullanımını ihmal ederseniz, servis sunucuya silme isteği gönderemez. Kural olarak, bir Observable, bir şey subscribe olana kadar hiçbir şey yapmaz.
}
