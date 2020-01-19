import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public currentDate: Date;

  constructor() {
    this.currentDate = new Date();
  }

  ngOnInit() {
  }

}
