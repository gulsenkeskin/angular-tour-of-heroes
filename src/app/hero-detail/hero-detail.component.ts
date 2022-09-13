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
    this.getHero();
  }

  @Input() hero?: Hero; //Hero özelliğini harici HeroesComponent tarafından bağlanmaya uygun hale getirmek için @Input dekoratörünü kullanırız//bu component hero özelliği aracılığıyla bir hero nesnesi alır ve onu görüntüler

  getHero(): void {
    //route.snapshot component oluşturulduktan kısa bir süre sonra rota bilgisinin statik bir görüntüsüdür. //route parametreleri her zaman stringdir bu yüzden number id number ile sayıya çevrildi.
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.heroService.getHero(id).subscribe(hero => this.hero = hero);

  }




}
