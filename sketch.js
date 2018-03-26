'use strict';

const dim = 10
const col = 40
const row = 40

let cnv

function centerCanvas() {
  let x = (windowWidth - width) / 2
  let y = (windowHeight - height) / 2
  cnv.position(x, y)
}

function setup() {
  cnv = createCanvas(col * dim + 1, row * dim + 1)
  centerCanvas()
  background(255, 0, 200)
  frameRate(10)
}

function windowResized() {
  centerCanvas()
}

function draw() {
}
