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

  constructor(private unsubscribe$: UnsubscribeService,
              private renderer: Renderer2) {
    this.currentDate = new Date();
  }

  ngOnInit() {
    fromEvent<Event>(document, 'scroll')
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => {
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

  public toggleDropMenu(state): void {
    this.addScrolledClass();

    state ? this.showDropDownMenu() : this.hideDropDownMenu();
  }

  private showDropDownMenu(): void {
    const headerHeight = this.header.nativeElement.clientHeight;

    this.renderer.setStyle(this.dropMenu.nativeElement, 'transform', `translateY(${headerHeight}px)`)
  }

  private hideDropDownMenu(): void {
    this.renderer.setStyle(this.dropMenu.nativeElement, 'transform', `translateY(-100%)`)
  }
}
