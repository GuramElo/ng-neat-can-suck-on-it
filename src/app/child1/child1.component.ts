import { JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child1',
  imports: [JsonPipe],
  templateUrl: './child1.component.html',
  styleUrls: ['./child1.component.scss'],
  standalone: true
})
export class Child1Component {
  @Input() set hello(param: any) {
    if ((param ?? null) === null) {
      return;
    }
    console.log(param, '1111')
    this.updateValue(param)
  }
  value: any;
  updateValue(args:any): void {
    this.value = args;
  }
}
