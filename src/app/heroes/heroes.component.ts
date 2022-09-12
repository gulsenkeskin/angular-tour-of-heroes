import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
@Component({
  selector: 'app-heroes', //bileşenin seçicisi
  templateUrl: './heroes.component.html', //şablon dosya konumu
  styleUrls: ['./heroes.component.css'] //bileşene özel css stil konumu 
})
export class HeroesComponent implements OnInit {

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  constructor() { }

  //bileşen oluşturulduktan kısa bir süre sonra çağrılır
  ngOnInit(): void {
  }

}
