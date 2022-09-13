import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['../app.component.css']
})
export class HeroDetailComponent implements OnInit {

  //Location tarayıcıyla etkileşim kurmak için bir angular servisidir. Bu servis önceki view e görü dönmeyi sağlar.
  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) { }

  ngOnInit(): void {
  }

  @Input() hero?: Hero; //Hero özelliğini harici HeroesComponent tarafından bağlanmaya uygun hale getirmek için @Input dekoratörünü kullanırız


  //bu component hero özelliği aracılığıyla bir hero nesnesi alır ve onu görüntüler

}
