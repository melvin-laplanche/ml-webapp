import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogAdminComponent } from './blog-admin.component';
import { ListingComponent } from './listing/listing.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BlogAdminComponent, ListingComponent]
})
export class BlogAdminModule { }
