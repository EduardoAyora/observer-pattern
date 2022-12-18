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

Salida:

```
2
5
7
14
12
15
17
44
```