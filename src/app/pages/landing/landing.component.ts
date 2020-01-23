import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { UnsubscribeService } from '@shared/services/unsubscribe.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UnsubscribeService]
})

export class LandingComponent implements OnInit {

  public currentDate: Date;

  @ViewChild('header', {static: true})
  private header: ElementRef;
  @ViewChild('dropMenu', {static: true})
  private dropMenu: ElementRef;

  constructor(private unsubscribe$: UnsubscribeService) {
    this.currentDate = new Date();
  }

  ngOnInit() {
    fromEvent<Event>(document, 'scroll')
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => {
          if(this.checkDropMenuActiveClass) return;

          LandingComponent.documentScrollHeight === 0 ?
            this.removeScrolledClass() : this.addScrolledClass();
          }),
      )
      .subscribe();
  }

  private static get documentScrollHeight(): number {
    return document.body.scrollTop || document.documentElement.scrollTop;
  }

  private addScrolledClass(): void {
    this.header.nativeElement.classList.add('header-background');
  }

  private removeScrolledClass(): void {
    this.header.nativeElement.classList.remove('header-background');
  }

  private get checkDropMenuActiveClass(): boolean {
    return this.dropMenu.nativeElement.classList.contains('active');
  }

  public toggleDropMenu(): void {
    this.addScrolledClass();

    this.dropMenu.nativeElement.classList.toggle('active');
  }
}
