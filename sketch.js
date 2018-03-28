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
    } while (this.matx[x][y] !== 0) 
    this.matx[x][y] = 1
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
    rect(0, 0, 500, 500, 5)
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        let val = this.matx[x][y]
        let xoff = x * (wid + mar) + mar
        let yoff = y * (hei + mar) + mar
        fill(this.colr[val])
        rect(xoff, yoff, hei, wid, 2)
        fill('#776e65')
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
}
