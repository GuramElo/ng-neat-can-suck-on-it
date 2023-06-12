import { Component } from '@angular/core';

@Component({
  selector: 'app-child2',
  templateUrl: './child2.component.html',
  styleUrls: ['./child2.component.scss'],
  standalone: true
})
export class Child2Component {
  value2: any;
  updateValue(args:any): void {
    this.value2 = args;
  }
}
