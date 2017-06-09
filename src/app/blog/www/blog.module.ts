import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Router
import { RouterModule } from '@angular/router';
import { blogRoutes } from './blog.routes';

import { HeaderModule } from '../../shared/header/header.module';

// Blog components
import { ArticlesComponent } from './articles/articles.component';
import { ListingComponent } from './listing/listing.component';
import { BlogComponent } from './blog.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(blogRoutes),
    HeaderModule,
  ],
  exports: [
    RouterModule
  ],
  declarations: [ArticlesComponent, ListingComponent, BlogComponent]
})
export class BlogModule { }
