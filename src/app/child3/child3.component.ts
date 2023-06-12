import { Component } from '@angular/core';

@Component({
  selector: 'app-child3',
  templateUrl: './child3.component.html',
  styleUrls: ['./child3.component.scss'],
  standalone: true
})
export class Child3Component {
  value3: any;
  updateValue(args:any): void {
    this.value3 = args;
  }
}
