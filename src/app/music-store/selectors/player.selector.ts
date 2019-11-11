import { createSelector } from "@ngrx/store";
import { PlayState } from 'src/app/core/models';

const selectPlayStates = (state: PlayState) => state;

export const getPlaying = createSelector(selectPlayStates, (state:PlayState) => state.playing);
export const getSongList = createSelector(selectPlayStates, (state:PlayState) => state.songList);
export const getPlayList = createSelector(selectPlayStates, (state:PlayState) => state.playList);
export const getPlayMode = createSelector(selectPlayStates, (state:PlayState) => state.playMode);
export const getcurrentIndex = createSelector(selectPlayStates, (state:PlayState) => state.currentIndex);

export const getCurrentSong = createSelector(selectPlayStates, ({playList, currentIndex}:PlayState) => playList[currentIndex]);