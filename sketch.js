'use strict';

class G2048 {
  constructor(wid, hei) {
    this.wid = wid
    this.hei = hei
    this.matx = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    this.game = true
    this.colr = [
      '#cdc0b4','#eee4da','#ede0c8','#f2b179','#f59563','#f67c5f',
      '#f65e3b','#edcf72','#edcc61','#edc850','#edc53f','#edc22e'
    ]
    this.spawn()
    this.spawn()
  }

  spawn() {
    let x, y
    do {
      x = Math.floor(Math.random() * 4)
      y = Math.floor(Math.random() * 4)
    } while (this.matx[y][x] !== 0) 
    this.matx[y][x] = 1
  }

  move(h, v) {
    let aux = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    let d = h === 0 ? v : h
    let e = d > 0 ? 0 : 3
    let a, b, c
    for (let y = 0; y < 4; y++) {
      a = e
      c = 0
      for (let x = 0; x < 4; x++) {
        b = v === 0 ? this.matx[y][x * d + e] : this.matx[x * d + e][y]
        if (b > 0) {
          if (b !== c) {
            v === 0 ? aux[y][a] = b : aux[a][y] = b
            c = b
            a += d
          } else {
            v === 0 ? aux[y][a - d]++ : aux[a - d][y]++
            c = 0
          }
        }
      }
    }
    this.matx = aux
    this.spawn()
  }

  left() {
    this.move(1, 0)
  }

  down() {
    this.move(0, -1)
  }

  up() {
    this.move(0, 1)
  }

  right() {
    this.move(-1, 0)
  }

  draw() {
    let mar = 15
    let wid = (this.wid - mar) / 4 - mar
    let hei = (this.hei - mar) / 4 - mar
    noStroke()
    textSize(55)
    textFont('Arial')
    textStyle(BOLD)
    textAlign(CENTER, CENTER)
    translate(15, 15)
    fill('#bbada0')
    rect(0, 0, 500, 500, 7)
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        let val = this.matx[y][x]
        let xoff = x * (wid + mar) + mar
        let yoff = y * (hei + mar) + mar
        fill(this.colr[val])
        rect(xoff, yoff, hei, wid, 4)
        fill(val > 2 ? '#f9f6f2' : '#776e65')
        if (val > 0) text(Math.pow(2, val), xoff + wid/2, yoff + hei/2)
      }
    }
  }
}

const g2048 = new G2048(500, 500)

let cnv

function centerCanvas() {
  let x = (windowWidth - width) / 2
  let y = (windowHeight - height) / 2
  cnv.position(x, y)
}

function setup() {
  cnv = createCanvas(530, 530)
  centerCanvas()
  background('#faf8ef')
  frameRate(10)
  g2048.draw()
}

function windowResized() {
  centerCanvas()
}

function draw() {
  g2048.draw()
}

function keyPressed() {
  if (key === 'H' || key === 'A' || key === '%') g2048.left()
  if (key === 'J' || key === 'S' || key === '(') g2048.down()
  if (key === 'K' || key === 'W' || key === '&') g2048.up()
  if (key === 'L' || key === 'D' || key === "'") g2048.right()
}
