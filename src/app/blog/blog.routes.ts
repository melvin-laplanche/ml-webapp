import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';

export const blogRoutes: Routes = [
  { path: '', component: ArticlesComponent },
];