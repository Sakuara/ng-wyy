import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject, OnDestroy, Input, Output,EventEmitter } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { filter, tap, pluck, map, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('slider', { static: true }) slider: ElementRef;
  sliderDom: HTMLElement;
  start$: Observable<number>;
  move$: Observable<any>;
  end$: Observable<Event>;
  resize$: Subscription;
  offset = 0;
  domRect: DOMRect | ClientRect;
  // @Input() endOffset = 0;
  @Output() endOffsetChange = new EventEmitter<number>();
  constructor(
    @Inject(DOCUMENT) private doc: Document,
  ) { }

  resize() {
    this.resize$ = fromEvent(window, 'resize').subscribe(
      _ => {
        this.domRect = this.sliderDom.getBoundingClientRect();
        console.log(this.domRect);
      }
    )
  }

  draggableObservalbe() {
    this.start$ = fromEvent(this.sliderDom, 'mousedown').pipe(
      filter(event => {
        return event instanceof MouseEvent;
      }),
      tap((e: Event) => {
        e.preventDefault();
        e.stopPropagation();
      }),
      pluck('pageX')
    );
    this.end$ = fromEvent(this.doc, 'mouseup');
    this.move$ = fromEvent(this.doc, 'mousemove').pipe(
      filter(event => {
        return event instanceof MouseEvent;
      }),
      tap((e: Event) => {
        e.preventDefault();
        e.stopPropagation();
      }),
      pluck('pageX'),
      distinctUntilChanged(),
      takeUntil(this.end$)
    );

  }

  // computed initial offset
  computedOffset(pos) {
    const all = this.domRect['width']; // 总长度
    const offset = pos - this.domRect['x']; // current position - initial x value
    this.offset = offset * 100 / all;
    if (this.offset < 0) {
      this.offset = 0;
    } else if (this.offset > 100) {
      this.offset = 100;
    }
  }

  ngOnInit() {
    this.sliderDom = this.slider.nativeElement;
    this.domRect = this.sliderDom.getBoundingClientRect(); // 获取元素块初始的值
    this.resize();
    this.draggableObservalbe();
    this.start$.subscribe(
      res => {
        this.computedOffset(res);
        this.move$.subscribe(p => this.computedOffset(p));
      }
    );
  }

  ngAfterViewInit() {

  }

  ngOnDestroy(): void {
    if (this.resize$) {
      this.resize$.unsubscribe();
    }
  }

}
