export interface ObservableObserver<T> {
  state: T;
  setState(state: any): void;
}

export const createObserableObserver = (initializer, observableDependencies?) => {
  const state = initializer
  const businessLogic = initializer
  const newObserableObserver = {
    state,
    subscribers: [],
    subscribe(subscriber) {
      this.subscribers.push(subscriber)
      this.notify()
    },
    unsubscribe(subscriber) {
      this.subscribers = this.subscribers.filter((item) => item !== subscriber)
    },
    notify() {
      for (const subscriber of this.subscribers) {
        subscriber.update()
      }
    },
    setState(state) {
      this.state = state
      this.notify()
    },
    update() {
      this.setState(businessLogic(this))
    },
  }
  if (typeof initializer === 'function') {
    newObserableObserver.update()
  }
  if (Array.isArray(observableDependencies)) {
    for (const observableDependencie of observableDependencies) {
      observableDependencie.subscribe(newObserableObserver)
    }
  }
  return newObserableObserver
}
