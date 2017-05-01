import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Router
import { RouterModule } from '@angular/router';
import { blogRoutes } from './blog.routes';

// Blog components
import { ArticlesComponent } from './articles/articles.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(blogRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [ArticlesComponent]
})
export class BlogModule { }
