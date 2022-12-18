export interface ObservableObserver<T> {
    state: T;
    setState(state: any): void;
}
export declare const createObserableObserver: (initializer: any, observableDependencies?: any) => {
    state: any;
    subscribers: any[];
    subscribe(subscriber: any): void;
    unsubscribe(subscriber: any): void;
    notify(): void;
    setState(state: any): void;
    update(): void;
};
