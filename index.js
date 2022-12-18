const createObserable = (state) => {
  const subscribers = []
  return {
    state,
    subscribe(fn) {
      subscribers.push(fn)
    },
    unsubscribe(fn) {
      subscribers = subscribers.filter((item) => item !== fn)
    },
    notify() {
      for (const subscriber of subscribers) {
        subscriber.update(this)
      }
    },
    setState(state) {
      this.state = state
      this.notify()
    },
  }
}

const createObserver = (businessLogic) => {
  return {
    state: null,
    update(observable) {
      this.state = businessLogic(observable.state)
    },
  }
}

const observable = createObserable(1)
const observable2 = createObserable(2)

const observer1 = createObserver((observableState) => observableState + 1)
const observer2 = createObserver((observableState) => observableState + 3)

observable.subscribe(observer1)
observable2.subscribe(observer2)

observable.notify()
observable2.notify()

console.log(observer1.state)
console.log(observer2.state)

observable.setState(11)
observable2.setState(12)

console.log(observer1.state)
console.log(observer2.state)
