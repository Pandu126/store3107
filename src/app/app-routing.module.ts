import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { authGuard } from './services/auth.guard';
import { SinglePostComponent } from './posts/single-post/single-post.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'counter',
    loadChildren: () =>
      import('./Components/counter/counter.module').then(
        (m) => m.CounterModule
      ),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./posts/posts.module').then((m) => m.PostsModule),
    canActivate: [authGuard],
  },
  { path: 'posts/details/:id', component: SinglePostComponent },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
