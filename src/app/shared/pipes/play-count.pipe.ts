import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playCount'
})
export class PlayCountPipe implements PipeTransform {

  transform(playCount: any, ...args: any[]): any {
    let rest = Math.floor(playCount / 10000);
    if(rest>=1){
      return rest + '万'
    }
    return rest;
  }

}
