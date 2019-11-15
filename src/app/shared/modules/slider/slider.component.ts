import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject, OnDestroy, Input, Output,EventEmitter, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { filter, tap, pluck, map, distinctUntilChanged, takeUntil, concatAll } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true
    }
  ]
})
export class SliderComponent implements OnInit, AfterViewInit, OnDestroy,OnChanges,ControlValueAccessor {

  @ViewChild('slider', { static: true }) slider: ElementRef;
  sliderDom: HTMLElement;
  start$: Observable<number>;
  move$: Observable<any>;
  end$: Observable<Event>;
  _all$: Subscription;
  _end$: Subscription;
  resize$: Subscription;
  // offset = 0;
  domRect: DOMRect | ClientRect;

  @ViewChild('mockSlider', { static: true }) mockSlider: ElementRef;
  mockSliderDom: HTMLElement;
  mouseDown$: Observable<any>;
  mouseMove$: Observable<any>;
  mouseUp$: Observable<any>;

  get offset() {
    return this._offset;
  }

  set offset(val) {
    this._offset = val;
  }
  @Input() _offset = 0;
  @Output() nzAfterChange = new EventEmitter<number>();
  constructor(
    @Inject(DOCUMENT) private doc: Document,
  ) { }

  // 定义此方法，当数据变化时发送数据给外部组件
  propagateChange =(_:any) => {};
  writeValue(val) {
    if(val) {
      this.offset = val*1000;
      this.propagateChange(this._offset);
    }
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {}

  resize() {
    this.resize$ = fromEvent(window, 'resize').subscribe(
      _ => {
        this.domRect = this.sliderDom.getBoundingClientRect();
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
    this._all$ = this.start$.pipe(
      map(event => this.move$),
      concatAll(),
    ).subscribe(pos => {
      this.computedOffset(pos);
    })

    // this.start$.subscribe(
    //   res => {
    //     this.computedOffset(res);
    //     this.move$.subscribe(p => this.computedOffset(p));
    //   }
    // );
    // this.start$.subscribe(
    //   res => {
    //     this.computedOffset(res);
    //     this.move$.subscribe(p => this.computedOffset(p));
    //   }
    // );
    this._end$ = this.end$.subscribe(
      res => {
        this.nzAfterChange.emit(this.offset);
      }
    )
  }

  ngOnChanges(change: SimpleChanges) {
    // if(change['sliderValue']){
    //   this.offset = this.sliderValue*1000;
    //   this.sliderValueChange.emit(this.sliderValue);
    // }
  }

  ngAfterViewInit() {

  }

  ngOnDestroy(): void {
    if (this.resize$) {
      this.resize$.unsubscribe();
    }
    if(this._all$){
      this._all$.unsubscribe();
    }
    if(this._end$){
      this._end$.unsubscribe();
    }
  }

}
