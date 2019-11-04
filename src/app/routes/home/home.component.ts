import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HomeService } from './home.service';
import { Banner } from './models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private rd2: Renderer2,
    private homeService: HomeService,
  ) { }

  ngOnInit() {
    
  }

}
