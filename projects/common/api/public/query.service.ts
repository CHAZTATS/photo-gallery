import { BehaviorSubject, Observable } from 'rxjs';
import { skipUntil } from 'rxjs/operators';
import { ApiConfig, Method } from './api.lib';
import { ApiService } from './api.service';

export abstract class QueryService<T> {

    private entitySubject$ = new BehaviorSubject<T[]>([]);
    private loadingSubject$ = new BehaviorSubject(false);

    entities$ = this.entitySubject$.asObservable();
    loading$ = this.loadingSubject$.asObservable();

    constructor(private root: QueryRoot, private api: ApiService<any>, private sorter: (a: T, b: T) => number = null) { }

    getAll() { return this._getAll(); }

    getWithQuery(queryParams: { [name: string]: string }): Observable<T[]> {
        const queryString = '?' + Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');
        return this._getAll(queryString);
    }

    private _getAll(subpath?: string): Observable<T[]> {

        const config = (typeof this.root === 'string') ?
            {
                requestType: Method.Get,
                path: subpath ? this.root + subpath : this.root
            }
            : {
                ...this.root,
                path: subpath ? this.root.path + subpath : this.root.path
            };

        const api = this.api.request({ config });

        this.loadingSubject$.next(true);

        api.subscribe(e => {
            this.addToBehaviourSubject(e);
            this.loadingSubject$.next(false);
        });

        return this.entities$.pipe(skipUntil(api));
    }
    private addToBehaviourSubject(entities: T[]) {
        if (entities && this.sorter) {
            entities.sort(this.sorter);
        }
        this.entitySubject$.next(entities);
    }
}

export type QueryRoot = string | ApiConfig;
