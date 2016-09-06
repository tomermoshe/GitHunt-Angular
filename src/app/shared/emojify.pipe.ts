import { Pipe, PipeTransform } from '@angular/core';
import { emojify } from 'node-emoji';

@Pipe({
  name: 'emojify'
})
export class EmojifyPipe implements PipeTransform {
  transform(text) {
    if (text) {
      return emojify(text);
    }
  }
}
