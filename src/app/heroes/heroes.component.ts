import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-heroes', //bileşenin seçicisi
  templateUrl: './heroes.component.html', //şablon dosya konumu
  styleUrls: ['./heroes.component.css'] //bileşene özel css stil konumu 
})
export class HeroesComponent implements OnInit {
  
  heroes:Hero[]=[];

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  constructor(private heroService:HeroService) { }

  //bileşen oluşturulduktan kısa bir süre sonra çağrılır
  ngOnInit(): void {
    this.getHeroes();
  }

  selectedHero?: Hero;
  onSelect(hero:Hero):void{
    this.selectedHero=hero;
  }

  //eşzamanalı //uzak bir sunucudan istekte bulunulduğunda çalışmaz!
  // getHeroes(){
  //   this.heroes=this.heroService.getHeroes();
  // }

  //eşzamansız //sunucudan veri çekerken çalışır
  getHeroes():void{
    this.heroService.getHeroes().subscribe(heroes=>this.heroes=this.heroes);
  }

}
