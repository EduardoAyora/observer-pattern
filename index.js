const createObserableObserver = ({ state, businessLogic }) => {
  const subscribers = []
  return {
    state,
    subscribe(fn) {
      subscribers.push(fn)
      this.notify()
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
    update(observable) {
      this.setState(businessLogic(observable.state))
    },
  }
}

const observable = createObserableObserver({ state: 1 })
const observable2 = createObserableObserver({ state: 2 })

const observer1 = createObserableObserver({
  businessLogic: (observableState) => observableState + 1,
})
const observer12 = createObserableObserver({
  businessLogic: (observableState) => observableState + 5,
})
const observer2 = createObserableObserver({
  businessLogic: (observableState) => observableState + 3,
})

observable.subscribe(observer1)
observable2.subscribe(observer2)
observer1.subscribe(observer12)

console.log(observer1.state)
console.log(observer2.state)
console.log(observer12.state)

observable.setState(11)
observable2.setState(12)

console.log(observer1.state)
console.log(observer2.state)
console.log(observer12.state)
