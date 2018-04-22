import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatOptionModule,MatSelectModule,MatFormFieldModule} from '@angular/material';



@NgModule({
  imports: [MatFormFieldModule,MatSelectModule,MatOptionModule],
  exports: [MatFormFieldModule,MatSelectModule,MatOptionModule],
  declarations: []
})
export class MaterialModuleModule { }
