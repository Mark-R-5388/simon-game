import { getElement } from './functions.js'
// Order of lights
let order = []
// player button press
let playerOrder = []
// # of flashes
let flash
// what turn we are on
let turn
// if player guessed right
let good
// is it the cpu or players turn
let compTurn
let intervalId
let strict = false
let on = false
let win

const [
  turnCounter,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  strictButton,
  onButton,
  startButton,
] = [
  getElement('#turn'),
  getElement('#top-left'),
  getElement('#top-right'),
  getElement('#bottom-left'),
  getElement('#bottom-right'),
  getElement('#strict'),
  getElement('#on'),
  getElement('#start'),
]

//Strict mode on
strictButton.addEventListener('change', (e) => {
  strictButton.checked ? (strict = true) : (strict = false)
})

// On button
onButton.addEventListener('click', (e) => {
  if (onButton.checked === true) {
    on = true
    turnCounter.innerHTML = '---'
  } else {
    on = false
    turnCounter.innerHTML = ''
    clearColor()
    clearInterval(intervalId)
  }
})

startButton.addEventListener('click', (e) => {
  if (on || win) {
    play()
  }
})

function play() {
  win = false
  order = []
  playerOrder = []
  flash = 0
  intervalId = 0
  turn = 1
  turnCounter.innerHTML = 1
  good = true
  for (let i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1)
  }
  compTurn = true

  intervalId = setInterval(gameTurn, 800)
}

function gameTurn() {
  on = false

  if (flash === turn) {
    clearInterval(intervalId)
    compTurn = false
    clearColor()
    on = true
  }

  if (compTurn) {
    clearColor()
    setTimeout(() => {
      if (order[flash] == 1) one()
      if (order[flash] == 2) two()
      if (order[flash] == 3) three()
      if (order[flash] == 4) four()

      flash++
    }, 200)
  }
}

function clearColor() {
  topLeft.style.backgroundColor = 'green'
  topRight.style.backgroundColor = 'red'
  bottomLeft.style.backgroundColor = 'yellow'
  bottomRight.style.backgroundColor = 'blue'
}

function flashColor() {
  topLeft.style.backgroundColor = 'rgb(87, 255, 87)'
  topRight.style.backgroundColor = 'rgb(248, 86, 86)'
  bottomLeft.style.backgroundColor = 'rgb(255, 255, 132)'
  bottomRight.style.backgroundColor = 'rgb(83, 83, 250)'
}

function one() {
  topLeft.style.backgroundColor = 'rgb(87, 255, 87)'
}
function two() {
  topRight.style.backgroundColor = 'rgb(248, 86, 86)'
}
function three() {
  bottomLeft.style.backgroundColor = 'rgb(255, 255, 132)'
}
function four() {
  bottomRight.style.backgroundColor = 'rgb(83, 83, 250)'
}

topLeft.addEventListener('click', (e) => {
  if (on) {
    playerOrder.push(1)
    check()
    one()
    if (!win) {
      setTimeout(() => {
        clearColor()
      }, 300)
    }
  }
})

topRight.addEventListener('click', (e) => {
  if (on) {
    playerOrder.push(2)
    check()
    two()
    if (!win) {
      setTimeout(() => {
        clearColor()
      }, 300)
    }
  }
})

bottomLeft.addEventListener('click', (e) => {
  if (on) {
    playerOrder.push(3)
    check()
    three()
    if (!win) {
      setTimeout(() => {
        clearColor()
      }, 300)
    }
  }
})

bottomRight.addEventListener('click', (e) => {
  if (on) {
    playerOrder.push(4)
    check()
    four()
    if (!win) {
      setTimeout(() => {
        clearColor()
      }, 300)
    }
  }
})

function check() {
  if (playerOrder[playerOrder.length - 1] != order[playerOrder.length - 1]) {
    good = false
  }

  if (playerOrder.length == 20 && good) {
    winGame()
  }

  if (good == false) {
    flashColor()
    turnCounter.innerHTML = 'NO!'
    setTimeout(() => {
      turnCounter.innerHTML = turn
      clearColor()

      if (strict) {
        play()
      } else {
        compTurn = true
        flash = 0
        playerOrder = []
        good = true
        intervalId = setInterval(gameTurn, 800)
      }
    }, 800)
  }

  if (turn == playerOrder.length && good && !win) {
    turn++
    playerOrder = []
    compTurn = true
    flash = 0
    turnCounter.innerHTML = turn
    intervalId = setInterval(gameTurn, 800)
  }
}

function winGame() {
  flashColor()
  turnCounter.innerHTML = 'WIN!'
  on = false
  win = true
}
