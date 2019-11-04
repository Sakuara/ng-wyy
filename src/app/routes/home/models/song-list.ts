/**
 * @params
 * name: 歌单名称
 * picUrl: 封面图片地址
 * playCount 播放数量
*/
export interface SongList {
    id: number;
    name: string;
    picUrl: string;
    playCount: number;
}