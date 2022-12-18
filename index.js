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
}

const estadoUnoCapaUno = createObserableObserver({ state: 1 })
const estadoDosCapaUno = createObserableObserver({ state: 2 })

const estadoUnoCapaDos = createObserableObserver({
  businessLogic: (observable) => estadoUnoCapaUno.state + 1,
})
const estadoDosCapaDos = createObserableObserver({
  businessLogic: (observable) => estadoDosCapaUno.state + 3,
})
const estadoUnoCapaTres = createObserableObserver({
  businessLogic: (observable) => estadoUnoCapaDos.state + 5,
})
const estadoCombinadoCapaCuatro = createObserableObserver({
  businessLogic: () =>
    estadoUnoCapaDos.state + estadoDosCapaDos.state + estadoUnoCapaTres.state,
})

estadoUnoCapaUno.subscribe(estadoUnoCapaDos)
estadoDosCapaUno.subscribe(estadoDosCapaDos)
estadoUnoCapaDos.subscribe(estadoUnoCapaTres)
estadoUnoCapaDos.subscribe(estadoCombinadoCapaCuatro)
estadoDosCapaDos.subscribe(estadoCombinadoCapaCuatro)
estadoUnoCapaTres.subscribe(estadoCombinadoCapaCuatro)

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
