import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Router
import { RouterModule } from '@angular/router';
import { blogAdminRoutes } from './blog-admin.routes';

import { BlogAdminComponent } from './blog-admin.component';
import { ListingComponent } from './listing/listing.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(blogAdminRoutes),
  ],
  declarations: [BlogAdminComponent, ListingComponent]
})
export class BlogAdminModule { }
