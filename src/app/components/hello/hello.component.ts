import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  MonoTypeOperatorFunction,
  Observable,
  ObservableInput,
  Subject,
  fromEvent,
  noop,
  of,
  timer,
} from 'rxjs';
import { operate } from 'rxjs/internal/util/lift';
import { createOperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';
import { innerFrom } from 'rxjs/internal/observable/innerFrom';
interface DestroyBase {
  ___$destroyRef___?: Observable<void>;
  ngOnDestroy?: () => void;
  [key: string]: any;
}
function UntilDestroy(): ({ prototype }: {prototype: DestroyBase}) => void {
  return ({ prototype: instance }: { prototype: DestroyBase }) => {
    //const instance: DestroyBase = prototype;
    const originalOnDestroy: () => void =
      (instance.ngOnDestroy)?.bind?.(instance) ?? (() => void 0);
    // const originalOnInit: () => void = instance.ngOnInit?.bind?.(instance);
    const ___$destroyRef___ = new Subject<void>();

    Object.assign(instance, {
      ngOnDestroy: (() => {
        ___$destroyRef___.next();
        originalOnDestroy();
      }).bind(instance),
    });
    Object.defineProperty<DestroyBase>(
      instance,
      '___$destroyRef___',
      {
        value: ___$destroyRef___.asObservable(),
        writable: false,
        enumerable: false,
        configurable: false,
      }
    );
  };
}
export function takeUntilDestroyed<T = void>(value: DestroyBase): MonoTypeOperatorFunction<T> {
  const notifier: ObservableInput<void> = value.___$destroyRef___ ?? of(void 0);
  return operate((source, subscriber) => {
    innerFrom(notifier).subscribe(
      createOperatorSubscriber(subscriber, () => subscriber.complete(), noop)
    );
    !subscriber.closed && source.subscribe(subscriber);
  });
}
//====================================================================================
@UntilDestroy()
@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelloComponent {
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
}
