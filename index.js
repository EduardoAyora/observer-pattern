const createObserableObserver = (initializer, observableDependencies) => {
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
  if (Array.isArray(observableDependencies)) {
    for (const observableDependencie of observableDependencies) {
      observableDependencie.subscribe(newObserableObserver)
    }
  }
  return newObserableObserver
}

const estadoUnoCapaUno = createObserableObserver(1)
const estadoDosCapaUno = createObserableObserver(2)

const estadoUnoCapaDos = createObserableObserver(
  () => estadoUnoCapaUno.state + 1,
  [estadoUnoCapaUno]
)
const estadoDosCapaDos = createObserableObserver(
  () => estadoDosCapaUno.state + 3,
  [estadoDosCapaUno]
)
const estadoUnoCapaTres = createObserableObserver(
  () => estadoUnoCapaDos.state + 5,
  [estadoUnoCapaDos]
)
const estadoCombinadoCapaCuatro = createObserableObserver(
  () =>
    estadoUnoCapaDos.state + estadoDosCapaDos.state + estadoUnoCapaTres.state,
  [estadoUnoCapaDos, estadoDosCapaDos, estadoUnoCapaTres]
)

console.log(estadoUnoCapaDos.state)
console.log(estadoDosCapaDos.state)
console.log(estadoUnoCapaTres.state)
console.log(estadoCombinadoCapaCuatro.state)

estadoUnoCapaUno.setState(11)
estadoDosCapaUno.setState(12)

console.log(estadoUnoCapaDos.state)
console.log(estadoDosCapaDos.state)
console.log(estadoUnoCapaTres.state)
console.log(estadoCombinadoCapaCuatro.state)
