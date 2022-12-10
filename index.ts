import { Canvas } from "./src/canvas"
import { QuadTree } from "./src/quadtree"
import { v4 as uuid } from "uuid"


let canvas: HTMLCanvasElement = document.querySelector("#canvas")
let size = 500

canvas.width = size
canvas.height = size


let c = new Canvas(canvas)
let quadtree = new QuadTree(1, { x: 0, y: 0, height: size, width: size })
let id = uuid()

quadtree.addPlayer({ x: Math.floor(Math.random() * size), y: Math.floor(Math.random() * size), score: 0 }, id)
for (let i = 0; i < 400; i++) quadtree.addPlayer({ x: Math.floor(Math.random() * size), y: Math.floor(Math.random() * size), score: 0 }, uuid())


quadtree.addFruit({ x: Math.floor(Math.random() * size), y: Math.floor(Math.random() * size) }, uuid())
quadtree.addFruit({ x: Math.floor(Math.random() * size), y: Math.floor(Math.random() * size) }, uuid())
quadtree.addFruit({ x: Math.floor(Math.random() * size), y: Math.floor(Math.random() * size) }, uuid())
quadtree.addFruit({ x: Math.floor(Math.random() * size), y: Math.floor(Math.random() * size) }, uuid())
quadtree.addFruit({ x: Math.floor(Math.random() * size), y: Math.floor(Math.random() * size) }, uuid())


console.log(quadtree.getAllPlayers())
function update() {
    let a = quadtree.getPlayerByID(id)
    a.x += 1
    quadtree.update()
    c.clear("black")
    quadtree.draw(c)
    requestAnimationFrame(update)
}
requestAnimationFrame(update)

//c.drawRectangle({ height: , width: , x: , y:  }, "white")