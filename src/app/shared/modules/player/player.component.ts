import { Component, OnInit, ViewChild, ElementRef, Renderer2, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getSongList, getCurrentSong, getCurrentIndex, getPlayMode, getPlayList } from 'src/app/music-store/selectors/player.selector';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { DurationPipe } from './duration.pipe';
import { SetCurrentIndex } from 'src/app/music-store/actions/player.actions';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  playing: boolean;
  songList;
  playList;
  currentIndex: number;
  currentTime:string;
  playMode;
  currentSong;
  currentMode;
  playStore$: Observable<any>;
  offset;
  @ViewChild('audio', { static: true }) audio: ElementRef;
  audioEl: HTMLAudioElement;

  get picUrl(): string {
    return this.currentSong?this.currentSong.al.picUrl: 'http://p2.music.126.net/PZUe1srL41ICIFgveB_vFw==/109951164031637280.jpg';
  }

  get singer(): string {
    if(this.currentSong && this.currentSong.ar){
      return this.currentSong.ar[0].name;
    }else{
      return '未知';
    }
  }

  constructor(
    private rd2: Renderer2,
    private store$: Store<{ player: any }>,
    @Inject(DOCUMENT) private doc: Document,
  ) {
    this.initalData();

   
  }

  initalData() {
    this.playStore$ = this.store$.pipe(select('player'));
    this.playStore$.pipe(select(getSongList)).subscribe(list => this.songList = list);
    this.playStore$.pipe(select(getCurrentIndex)).subscribe(index => this.currentIndex = index);
    this.playStore$.pipe(select(getPlayList)).subscribe(list => this.playList = list);
    this.playStore$.pipe(select(getCurrentSong)).subscribe(song => {
      this.currentSong = song;
      if(song){

      }
    });
    this.playStore$.pipe(select(getPlayMode)).subscribe(playMode => this.playMode = playMode);

  }

  onTimeUpdate(e: Event) {
    let currentTime = (<HTMLAudioElement>e.target).currentTime;
    this.currentTime = new DurationPipe().transform(currentTime*1000);
    this.offset = currentTime/this.currentSong.dt;
  }

  onCanPlay() {
    this.play();
  }

  private play() {
    this.playing = true;
    this.audioEl.play();
  }

  private pre() {
    this.currentIndex<=0?this.currentIndex = this.songList.length-1:this.currentIndex-=1;
    this.updateIndex(this.currentIndex)
  }

  private next() {
    this.currentIndex >= this.songList.length-1?this.currentIndex = 0: this.currentIndex+=1;
    this.updateIndex(this.currentIndex)
  }

  private updateIndex(index: number) {
    this.store$.dispatch(SetCurrentIndex({currentIndex: index}));
  }

  pause() {
    this.playing = false;
    this.audioEl.pause();
  }

  computedCurrentTime(val) {
    console.log(val);
  }

  ngOnInit() {
    this.audioEl = this.audio.nativeElement;
  }


}
