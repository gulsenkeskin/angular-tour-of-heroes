import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes', //bileşenin seçicisi
  templateUrl: './heroes.component.html', //şablon dosya konumu
  styleUrls: ['./heroes.component.css'] //bileşene özel css stil konumu 
})
export class HeroesComponent implements OnInit {
  hero="Windstorm";

  constructor() { }

  //bileşen oluşturulduktan kısa bir süre sonra çağrılır
  ngOnInit(): void {
  }

}
