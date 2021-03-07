import { Injectable } from '@angular/core';
import { StorageMap, JSONSchema } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private storage: StorageMap) {
    }

    get<T>(index: string): Observable<T> {
        return <Observable<T>>this.storage.get(index);
    }

    // Write
    set(index: string, value: any): Observable<void> {
        return this.storage.set(index, value);
    }
    delete(index: string): Observable<void> {
        return this.storage.delete(index);
    }
    clear(): Observable<void> {
        return this.storage.clear();
    }

    // Advanced
    size: Observable<number>;
    has(index: string): Observable<boolean> {
        return this.storage.has(index);
    }
    keys(): Observable<string> {
        return this.storage.keys();
    }
}
