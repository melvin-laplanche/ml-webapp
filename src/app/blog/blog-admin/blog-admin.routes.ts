import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { BlogAdminComponent } from './blog-admin.component';

export const blogAdminRoutes: Routes = [
  {
    path: '', component: BlogAdminComponent,
    children: [
      { path: '', component: ListingComponent },
    ]
  }
];
