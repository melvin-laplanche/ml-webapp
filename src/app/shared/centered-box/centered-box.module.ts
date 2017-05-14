import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CenteredBoxComponent } from './centered-box.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CenteredBoxComponent],
  exports: [CenteredBoxComponent],
})
export class CenteredBoxModule { }
