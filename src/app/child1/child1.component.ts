import { Component } from '@angular/core';

@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',
  styleUrls: ['./child1.component.scss'],
  standalone: true
})
export class Child1Component {
  value: any;
  updateValue(args:any): void {
    this.value = args;
  }
}
