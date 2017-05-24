import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { BlogComponent } from './blog.component';

export const blogRoutes: Routes = [
  {
    path: '', component: BlogComponent,
    children: [
      { path: '', component: ListingComponent },
    ]
  }
];
