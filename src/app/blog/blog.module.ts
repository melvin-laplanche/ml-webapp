import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Router
import { RouterModule } from '@angular/router';
import { blogRoutes } from './blog.routes';

// Blog components
import { ArticlesComponent } from './articles/articles.component';
import { ListingComponent } from './listing/listing.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(blogRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [ArticlesComponent, ListingComponent]
})
export class BlogModule { }