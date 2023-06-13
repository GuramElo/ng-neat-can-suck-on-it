import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-mother',
  templateUrl: './mother.component.html',
  imports: [AsyncPipe, NgTemplateOutlet],
  styleUrls: ['./mother.component.scss'],
  standalone: true
})
export class MotherComponent {
  @Input() tut!: TemplateRef<any>;

  public readonly $sub = new Subject();

public handleClick() {
  // console.log('do smth')
  this.$sub.next({
    hello: Math.floor(Math.random()* 100)
  })
}
}
