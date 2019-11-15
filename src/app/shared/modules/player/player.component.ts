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

  playing: boolean = false;
  songList;
  playList;
  currentIndex: number;
  currentTime:string;
  time = 0;
  playMode;
  currentSong;
  currentMode;
  playStore$: Observable<any>;
  percent = 0;

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
    });
    this.playStore$.pipe(select(getPlayMode)).subscribe(playMode => this.playMode = playMode);

  }

  onTimeUpdate(e: Event) {
    this.time = (<HTMLAudioElement>e.target).currentTime;
    this.percent = this.time/this.currentSong.dt*100;
    this.currentTime = new DurationPipe().transform(this.time*1000);
  }

  timeEnded() {
    // 当一首歌播放完成时
    this.next();
    this.time = 0;
    this.percent = 0;
    this.currentTime = '00: 00';
    this.audioEl.currentTime = 0;
  }

  onCanPlay() {
    this.onToggle();
  }

  private onToggle() {
    if(this.currentSong) {
      this.playing = !this.playing;
      if(this.playing){
        this.audioEl.play();
      }else{
        this.audioEl.pause();
      }
    }
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

  percentSliderChange(percent) {
    if(this.currentSong){
      this.time = this.currentSong.dt*percent/(10**5);
      this.currentTime = new DurationPipe().transform(this.time*1000);
      this.audioEl.currentTime = this.time;
    }
  }

  ngOnInit() {
    this.audioEl = this.audio.nativeElement;
  }


}
