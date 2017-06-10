import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './blog.component';
import { ListingComponent } from './listing/listing.component';
import { AddArticleComponent } from './add-article/add-article.component';

export const blogRoutes: Routes = [
  {
    path: '', component: BlogComponent,
    children: [
      { path: '', component: ListingComponent },
      { path: 'add', component: AddArticleComponent },
    ]
  }
];
