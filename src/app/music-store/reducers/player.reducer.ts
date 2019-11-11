import { createReducer, on, Action } from '@ngrx/store';
import { PlayState } from '../../core/models';
import { SetPlaying, SetSongList, SetPlayList, SetPlayMode, SetCurrentIndex } from "../actions/player.actions";

export const initalState: PlayState = {
    playing: false,
    playMode: { type: 'loop', label: '循环' },
    songList: [],
    playList: [],
    currentIndex: -1
};

const _playReducer = createReducer(initalState,
    on(SetPlaying, (state, { playing }) => ({ ...state, playing })),
    on(SetSongList, (state, { songList }) => ({ ...state, songList })),
    on(SetPlayList, (state, { playList }) => ({ ...state, playList })),
    on(SetPlayMode, (state, { playMode }) => ({ ...state, playMode })),
    on(SetCurrentIndex, (state, { currentIndex }) => ({ ...state, currentIndex })),
)

export function playerReducer(state: PlayState, action: Action) {
    return _playReducer(state, action);
}