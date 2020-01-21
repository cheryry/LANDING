import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
      )
      .subscribe(() => this.toggleHeaderScrolled());
  }

  private toggleHeaderScrolled(): void {
    const scrollTop = document.documentElement.scrollTop;

    if(scrollTop === 0) {

      if(this.checkHeaderScrolledClass)
        this.header.nativeElement.classList.remove('scrolled');

    } else {

      if(!this.checkHeaderScrolledClass)
        this.header.nativeElement.classList.add('scrolled');
    }
  }

  private get checkHeaderScrolledClass(): boolean {
    return this.header.nativeElement.classList.contains('scrolled');
  }
}
