import xs, {Stream} from 'xstream';
import xsSA from '@cycle/xstream-adapter';
import {StreamAdapter} from '@cycle/base';
import {DOMSource, EventsFnOptions} from './DOMSource';
import {fromEvent} from './fromEvent';

export class BodyDOMSource implements DOMSource {
  constructor(private _runStreamAdapter: StreamAdapter) {
  }

  select(selector: string): DOMSource {
    // This functionality is still undefined/undecided.
    return this;
  }

  elements(): any {
    const runSA = this._runStreamAdapter;
    return runSA.remember(runSA.adapt(xs.of(document.body), xsSA.streamSubscribe));
  }

  events(eventType: string, options: EventsFnOptions = {}): any {
    let stream: Stream<Event>;
    if (options && typeof options.useCapture === 'boolean') {
      stream = fromEvent(document.body, eventType, options.useCapture);
    } else {
      stream = fromEvent(document.body, eventType);
    }
    return this._runStreamAdapter.adapt(stream, xsSA.streamSubscribe);
  }
}
