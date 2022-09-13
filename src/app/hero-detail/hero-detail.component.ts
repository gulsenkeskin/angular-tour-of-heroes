import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['../app.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() hero?:Hero; //Hero özelliğini harici HeroesComponent tarafından bağlanmaya uygun hale getirmek için @Input dekoratörünü kullanırız


  //bu component hero özelliği aracılığıyla bir hero nesnesi alır ve onu görüntüler

}
