import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BurgerComponent implements OnInit {

  @ViewChild('burger', {static: true})
  private burger: ElementRef;

  @Output()
  public toggled = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() { }

  public toggle(): void {
    this.burger.nativeElement.classList.toggle('open');

    this.emitToggleState();
  }

  private emitToggleState(): void {
    const state = this.burger.nativeElement.classList.contains('open');

    this.toggled.emit(state);
  }

}
