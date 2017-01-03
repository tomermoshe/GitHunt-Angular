import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-info-label',
  template: `<span class="label label-info">{{label}}: {{value}}</span>`
})
export class InfoLabelComponent {
  @Input()
  public label: string;

  @Input()
  public value: string;
}
