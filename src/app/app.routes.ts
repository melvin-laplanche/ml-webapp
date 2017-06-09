import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const appRoutes: Routes = [
  { path: 'blog', loadChildren: 'app/blog/www/blog.module#BlogModule' },
  { path: 'admin/blog', loadChildren: 'app/blog/blog-admin/blog-admin.module#BlogAdminModule' },

  { path: 'users', loadChildren: 'app/users/users.module#UsersModule' },

  { path: '', redirectTo: '/blog', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
