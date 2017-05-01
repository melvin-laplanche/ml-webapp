import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const appRoutes: Routes = [
  { path: 'blog', loadChildren: 'app/blog/blog.module#BlogModule' },

  { path: '', redirectTo: '/blog', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];