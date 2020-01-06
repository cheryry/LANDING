import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BurgerComponent } from './components/burger/burger.component';



@NgModule({
  declarations: [
    BurgerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BurgerComponent
  ]
})
export class SharedModule { }
