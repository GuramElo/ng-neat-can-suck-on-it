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
const destroyRefKey: symbol = Symbol('___$destroyRef___');
interface DestroyBase {
  // [destroyRefKey]?: Observable<void>;
  ngOnDestroy?: () => void;
  [key: string | symbol]: any;
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
      destroyRefKey,
      {
        value: ___$destroyRef___.asObservable().pipe(take(1)),
        writable: false,
        enumerable: false,
        configurable: false,
      }
    );
  };
}
export function letItGo<T = void>({[destroyRefKey]: ___$destroyRef___}: DestroyBase): MonoTypeOperatorFunction<T> {
  console.log('ramdenjer shemodis?')
  const notifier: ObservableInput<void> = ___$destroyRef___ ?? of(void 0);
  return operate((source, subscriber) => {
    innerFrom(notifier).subscribe(
      createOperatorSubscriber(subscriber, () => subscriber.complete(), noop)
    );
    !subscriber.closed && source.subscribe(subscriber);
  });
}
