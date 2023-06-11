import {
  MonoTypeOperatorFunction,
  Observable,
  ObservableInput,
  Subject,
  noop,
  of,
  take,
} from 'rxjs';
import { operate } from 'rxjs/internal/util/lift';
import { createOperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';
import { innerFrom } from 'rxjs/internal/observable/innerFrom';
interface DestroyBase {
  ___$destroyRef___?: Observable<void>;
  ngOnDestroy?: () => void;
  [key: string]: any
}
export function DeathMark(): ({ prototype }: {prototype: DestroyBase}) => void {
  return ({ prototype: instance }) => {
    //const instance: DestroyBase = prototype;
    const originalOnDestroy: () => void =
      (instance.ngOnDestroy)?.bind?.(instance) ?? (() => void 0);
    // const originalOnInit: () => void = instance.ngOnInit?.bind?.(instance);
    const ___$destroyRef___ = new Subject<void>();

    Object.assign(instance, {
      ngOnDestroy: (function() {
        ___$destroyRef___.next();
        originalOnDestroy();
      }).bind(instance),
    });
    Object.defineProperty<DestroyBase>(
      instance,
      '___$destroyRef___',
      {
        value: ___$destroyRef___.asObservable().pipe(take(1)),
        writable: false,
        enumerable: false,
        configurable: false,
      }
    );
  };
}
export function letItGo<T = void>({___$destroyRef___}: DestroyBase): MonoTypeOperatorFunction<T> {
  console.log('ramdenjer shemodis?')
  const notifier: ObservableInput<void> = ___$destroyRef___ ?? of(void 0);
  return operate((source, subscriber) => {
    innerFrom(notifier).subscribe(
      createOperatorSubscriber(subscriber, () => subscriber.complete(), noop)
    );
    !subscriber.closed && source.subscribe(subscriber);
  });
}
