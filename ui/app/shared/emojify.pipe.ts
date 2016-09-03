import { Pipe } from '@angular/core';
import { emojify } from 'node-emoji';

@Pipe({
  name: 'emojify'
})
export class EmojifyPipe {
  transform(text) {
    if (text) {
      return emojify(text);
    }
  }
}
