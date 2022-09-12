import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
@Component({
  selector: 'app-heroes', //bileşenin seçicisi
  templateUrl: './heroes.component.html', //şablon dosya konumu
  styleUrls: ['./heroes.component.css'] //bileşene özel css stil konumu 
})
export class HeroesComponent implements OnInit {
  
  heroes=HEROES;

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  constructor() { }

  //bileşen oluşturulduktan kısa bir süre sonra çağrılır
  ngOnInit(): void {
  }

  selectedHero?: Hero;
  onSelect(hero:Hero):void{
    this.selectedHero=hero;
  }

}
