const createObserableObserver = (initializer) => {
  const subscribers = []
  const state = initializer
  const businessLogic = initializer
  return {
    state,
    subscribe(subscriber) {
      subscribers.push(subscriber)
      this.notify()
    },
    unsubscribe(subscriber) {
      subscribers = subscribers.filter((item) => item !== subscriber)
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

const estadoUnoCapaUno = createObserableObserver(1)
const estadoDosCapaUno = createObserableObserver(2)

const estadoUnoCapaDos = createObserableObserver(
  () => estadoUnoCapaUno.state + 1
)
const estadoDosCapaDos = createObserableObserver(
  () => estadoDosCapaUno.state + 3
)
const estadoUnoCapaTres = createObserableObserver(
  () => estadoUnoCapaDos.state + 5
)
const estadoCombinadoCapaCuatro = createObserableObserver(
  () =>
    estadoUnoCapaDos.state + estadoDosCapaDos.state + estadoUnoCapaTres.state
)

// const estadoCombinadoCapaCuatros = createObserableObserver(
//   {
//     businessLogic: () =>
//       estadoUnoCapaDos.state + estadoDosCapaDos.state + estadoUnoCapaTres.state,
//   },
//   [estadoUnoCapaTres]
// )

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
