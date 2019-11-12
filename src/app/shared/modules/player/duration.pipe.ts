import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  // ms -> hh:mm:ss
  transform(value: any): string {
    if(!value){
      return '00 :00';
    }
    // es5 function ,we can use str.padstart to fill 0;
    const time = value/1000;
    let s,m,h;
    const h_m = time / 60;
    let str_s;
    let str_m;
    let str_h;
    s = Math.floor(time%60);
    str_s =this.equalTen(s);
    if(h_m / 60 < 1) {
      m = Math.floor(h_m);
      str_m = this.equalTen(m);
      return `${str_m}:${str_s}`
    }else{
      h = Math.floor(h_m/60);
      str_h = this.equalTen(h);
      m = Math.floor(h_m%60);
      this.equalTen(m);
      return `${str_h}:${str_m}:${str_s}`
    }
  }

  equalTen(num): string {
    if(num < 10){
      return `0${num}`;
    }
    return `${num}`;
  }

}
