export interface Song {
    name: string;
    id: number;
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
