import { Component } from '@angular/core';

@Component({
  selector: 'app-mother',
  templateUrl: './mother.component.html',
  styleUrls: ['./mother.component.scss'],
  standalone: true
})
export class MotherComponent {
public handleClick() {
  console.log('do smth')
}
}
