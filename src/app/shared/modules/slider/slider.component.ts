import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { filter, tap, pluck, map, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit,AfterViewInit {

  @ViewChild('slider', {static: true}) slider: ElementRef;
  sliderDom: HTMLElement;
  start$: Observable<number>;
  move$: Observable<number>;
  end$: Observable<Event>;
  resize$: Subscription;
  offset = 0;
  domRect: DOMRect | ClientRect;
  constructor(
    @Inject(DOCUMENT) private doc: Document,
  ) { }

  resize() {
    this.resize$ = fromEvent(window,'resize').subscribe(
      _ => {
        this.domRect = this.sliderDom.getBoundingClientRect();
        console.log(this.domRect['x']);
      }
    )
  }

  draggableObservalbe() {
    this.start$ = fromEvent(this.sliderDom,'mousedown').pipe(
      filter(event => {
        return event instanceof MouseEvent
      }),
      tap((e: Event) => {
        e.preventDefault();
        e.stopPropagation();
      }),
      pluck('pageX'),
      map((pos:number) => this.transferPostion(pos))
    );

    this.move$ = fromEvent(this.doc,'mousemove').pipe(
      filter(event => {
        return event instanceof MouseEvent
      }),
      tap((e: Event) => {
        e.preventDefault();
        e.stopPropagation();
      }),
      pluck('pageX'),
      distinctUntilChanged(),
      map((pos:number) => this.transferPostion(pos)),
      takeUntil(this.end$)
    );

    this.end$ = fromEvent(this.doc,'mouseup')
  }

  transferPostion(pos) {
    return pos;
  }

  // computed initial offset
  computedOffset(pos) {
    let all = this.domRect['width']; //总长度
    let offset = pos - this.domRect['x']; // current position - initial x value
    this.offset = offset*100/all;
  }

  ngOnInit() {
    this.sliderDom = this.slider.nativeElement;
    this.domRect = this.sliderDom.getBoundingClientRect();//获取元素块初始的值
    this.resize();
    this.draggableObservalbe();
    this.start$.subscribe(
      res => {
        this.computedOffset(res);
        console.log(this.offset);
      }
    )
  }

  ngAfterViewInit() {

  }

}
