import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription, Observable, fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-song-sheet',
  templateUrl: './song-sheet.component.html',
  styleUrls: ['./song-sheet.component.scss']
})
export class SongSheetComponent implements OnInit {

  mouseDown$: Observable<any>;
  mouseMove$: Observable<any>;
  mouseUp$: Observable<any>;
  @ViewChild('father',{static:true}) father: ElementRef;
  fatherDom: HTMLElement;
  constructor(
    @Inject(DOCUMENT) private doc: Document,
  ) { }

  ngOnInit() {
    this.fatherDom = this.father.nativeElement;
    this.mouseDown$ = fromEvent(this.fatherDom, 'mousedown');
    this.mouseMove$ = fromEvent(this.fatherDom, 'mousemove');
    this.mouseUp$ = fromEvent(this.fatherDom, 'mouseup');
    this.mouseDown$.pipe(
      map(e => {
        const {width,left} = this.fatherDom.getBoundingClientRect();
        const {clientX,clientY} = e;
        return {
          width,
          left,
          clientX,
          clientY
        };
      }),
      tap((...s) => console.log(...s))
    )
  }

}
