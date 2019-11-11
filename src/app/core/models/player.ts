import { Song } from './song-sheet';

/**
 * @param type: 'loop' | 'random' | 'single'
 * @param label: '循环' | '随机' | '单曲循环'
 * */ 
export interface PlayMode {
    type: 'loop' | 'random' | 'single';
    label: '循环' | '随机' | '单曲循环';
}

/**
 * @param playing: 播放状态
 * @param playMode: 播放模式
 * @param songList: 歌曲列表
 * @param playList: 播放列表
 * @param currentIndex: 当前索引
 * */ 
export interface PlayState {
    playing: boolean; // 播放状态
    playMode: PlayMode;
    songList: Song[]; // 歌曲列表
    playList: Song[]; // 播放列表
    currentIndex: number; // 当前播放索引
}