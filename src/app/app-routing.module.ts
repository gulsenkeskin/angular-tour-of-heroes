import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  //uygulamanın dashboarda otomatik olarak gitmesi için
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },

];

@NgModule({

  //Yönlendiriciyi uygulamanın kök düzeyinde yapılandırdığınız için yöntem forRoot() olarak adlandırılır.
  //forRoot() yöntemi, yönlendirme için gereken servis sağlayıcıları ve yönergeleri sağlar ve geçerli tarayıcı URL'sine dayalı olarak ilk gezinmeyi gerçekleştirir.
  imports: [RouterModule.forRoot(routes)],

  //Ardından, AppRoutingModule, RouterModule'u uygulama genelinde kullanılabilir olacak şekilde dışa aktarır.
  exports: [RouterModule],
})
export class AppRoutingModule { }
