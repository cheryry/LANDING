import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
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

  constructor(private unsubscribe$: UnsubscribeService) {
    this.currentDate = new Date();
  }

  ngOnInit() {
    fromEvent<Event>(document, 'scroll')
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(() => document.documentElement.scrollTop === 0 ?
          this.checkHeaderScrolledClass : !this.checkHeaderScrolledClass)
      )
      .subscribe(() => this.toggleHeaderScrolled());
  }

  private toggleHeaderScrolled(): void {
    this.header.nativeElement.classList.toggle('scrolled');
  }

  private get checkHeaderScrolledClass(): boolean {
    return this.header.nativeElement.classList.contains('scrolled');
  }
}
