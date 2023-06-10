import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, map, startWith, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'decorators-test';
  public readonly haha$: any = timer(0, 5000).pipe(map((num: number) => Boolean(num%2)))
}
