import { Component, OnInit, Input, Output, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit {

  @Input() songLists;
  @ViewChild('audio', {static: true}) audio: ElementRef;
  constructor(
    private rd2: Renderer2,
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.rd2.setAttribute(this.audio.nativeElement,'src','');
  }

}
