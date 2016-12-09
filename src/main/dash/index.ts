import { Stream, never, map } from 'most';
import { path, propOr } from 'ramda';
import { div, p } from '@motorcycle/dom';
import firebase = require('firebase');
import { MainSinks, MainSources } from '../../app';
import { Authentication } from '../../drivers/firebase-authentication';

export function Dash(sources: MainSources): MainSinks {
  const { authentication$ } = sources;

  const user$: Stream<firebase.User | null> =
    map<Authentication, firebase.User | null>(path(['userCredential', 'user']), authentication$);

  const userEmail$: Stream<string> =
    map<firebase.User | null, string>(toUserEmail, user$);

  const view$ = userEmail$.map(view);

  return {
    dom: view$,
    router: never(),
    authentication$: never(),
  };
}

function toUserEmail(user: firebase.User | null): string {
  if (!user)
    return `Unknown User`;

  return propOr<string, firebase.User, string>('Unknown User', 'email', user);
}

function view(userEmail: string) {
  return div({}, [
    p({}, [ `You are currently logged in as: ${userEmail}` ]),
  ]);
}