import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdIconModule, MdButtonModule } from '@angular/material';

// Router
import { RouterModule } from '@angular/router';
import { blogRoutes } from './blog.routes';

import { HeaderModule } from '../shared/header/header.module';

// Blog components
import { ArticlesComponent } from './articles/articles.component';
import { ListingComponent } from './listing/listing.component';
import { BlogComponent } from './blog.component';
import { AddArticleComponent } from './add-article/add-article.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(blogRoutes),
    MdIconModule,
    MdButtonModule,
    HeaderModule,
  ],
  exports: [
    RouterModule
  ],
  declarations: [ArticlesComponent, ListingComponent, BlogComponent, AddArticleComponent]
})
export class BlogModule { }
