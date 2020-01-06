import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss']
})
export class BurgerComponent implements OnInit {

  @ViewChild('burger', {static: true}) burger: ElementRef;

  constructor() { }

  ngOnInit() {

  }

  public toggle(): void {
    this.burger.nativeElement.classList.toggle('open');
  }

}
