//====================================================================================
import {takeUntilDestroyed, UntilDestroy} from "../../../decorators/ng-neaat-can-suck-on-this";
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {fromEvent, timer} from "rxjs";

@UntilDestroy()
@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelloComponent implements OnInit, OnDestroy {
  pura: any = 123123123123;
  pura123123: any = 'asdasdasdasdasd';
  fula$: any = timer(0, 1000)
    .pipe(
      takeUntilDestroyed(this)
    )
    .subscribe((stat) => {
      console.log(stat, '000000000000000000000000000');
    });
  ngOnInit(): void {
    fromEvent(document, 'click').pipe(
      takeUntilDestroyed(this)
    ).subscribe({
      next: (next: any) => {
        console.log(next, 'next')
      },
      complete(...compplete: any) {
          console.log(compplete, 'completeee')
      },
    });
  }
  ngOnDestroy() {
    console.log('destroyyyy')
  }
}
