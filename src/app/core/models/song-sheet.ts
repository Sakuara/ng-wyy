/**
 * @param 
 * name: 歌名
 * id: id
 * ar: artists
 * al: albums
 * */ 
export interface SongSheet {
    name: string;
    id: number;
    tracks: Tracks[];
}

export interface Tracks {
    name: string;
    id: number;
    url: string;
    dt: number;
    ar: Ar[];
    al: Al[];
}

export interface Song {
    name: string;
    id: number;
    url: string;
    dt: number;
    ar: Ar[];
    al: Al[];
}

export interface Ar {
    id: number;
    name: string;
    tns: any[];
    alias: string[];
}

export interface Al {
    id: number;
    name: string;
    picUrl: string;
    pic: number;
}
