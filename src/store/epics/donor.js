import { DonorActions } from '../actions'
import { Observable } from "rxjs"
import 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { database } from 'firebase'

export class DonorEpics {
    static testHello = (action$) =>
        action$.ofType(DonorActions.TEST_HELLO)
            .switchMap(({ payload }) => Observable.of({ type: DonorActions.AFTER_TEST_HELLO, payload: { data: "After test" } }));
    static fetchDonor = (action$) =>
        action$.ofType(DonorActions.LOAD_DONORS)
            .switchMap(({ payload }) => database().ref('users').once('value').then(a => (DonorActions.loadDonorsFullFill({
                donors: Object.keys(a.val()).map(i => ({ ...a.val()[i], key: i })).sort((a, b) => a.group.toUpperCase() < b.group.toUpperCase() ? -1 : a.group.toUpperCase() > b.group.toUpperCase() ? 1 : 0),
                raw: a.val()
            }))).catch(e => Observable.of(DonorActions.loadDonorsFail(e))));
}
// console.log(DonorActions.loadDonorsFullFill(''))