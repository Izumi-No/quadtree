import { Canvas } from "./canvas";
import { Fruit, FruitHashMap, Player, PlayerHashMap, Rectangle } from "./types";
import { contains } from "./utils";


export class QuadTree {
    private nodes: QuadTree[];
    public players: PlayerHashMap;
    private fruits: FruitHashMap;

    constructor(private capacity: number, private bondary: Rectangle) {
        this.nodes = []
        this.players = {}
        this.fruits = {}
    }
    getPlayerByID(id:string): Player{
        if(!this.players[id]){
            for (let node of this.nodes){
                return node.getPlayerByID(id)
            }
        }
        return this.players[id]
    }
    addFruit(fruit: Fruit, id: string): boolean {
        if (!contains(this.bondary, fruit)) return false
        if (Object.keys(this.fruits).length < this.capacity) {
            this.fruits[id] = fruit
            return true
        }
        if (this.nodes.length < 1) this.divide()
        return this.nodes.reduce<boolean>((prev, curr) => { return prev || curr.addFruit(fruit, id) }, false)
    }

    addPlayer(player: Player, id: string): boolean {
        if (!contains(this.bondary, player)) return false
        if (Object.keys(this.players).length < this.capacity) {
            this.players[id] = player
            return true
        }
        if (this.nodes.length < 1) this.divide()
        return this.nodes.reduce<boolean>((prev, curr) => { return prev || curr.addPlayer(player, id) }, false)
    }
    getAllPlayers(): PlayerHashMap {
        if (this.nodes.length < 1) {
            return this.players
        }


        return this.nodes.reduce<PlayerHashMap>((prev, curr) => {
            return { ...prev, ...curr.getAllPlayers() }
        }, this.players)


    }
    update() {
        let players = this.getAllPlayers()
        this.nodes = []
        Object.entries(players).forEach(([id, player]) => this.addPlayer(player, id))


    }
    divide() {
        let width = this.bondary.width / 2, height = this.bondary.height / 2

        this.nodes[0] = new QuadTree(this.capacity, { x: this.bondary.x, y: this.bondary.y, width, height })
        this.nodes[1] = new QuadTree(this.capacity, { x: this.bondary.x + width, y: this.bondary.y, width, height })
        this.nodes[2] = new QuadTree(this.capacity, { x: this.bondary.x, y: this.bondary.y + height, width, height })
        this.nodes[3] = new QuadTree(this.capacity, { x: this.bondary.x + width, y: this.bondary.y + height, width, height })
    }

    draw(canvas: Canvas) {

        Object.values(this.players).forEach((player) => {
            canvas.drawPoint(player, "green", 4)
        })
        Object.values(this.fruits).forEach((fruit) => {
            canvas.drawPoint(fruit, "red", 4)
        })
        canvas.drawRectangle(this.bondary, "cyan");

        if (this.nodes[0]) this.nodes.forEach((quadtree) => {
            quadtree.draw(canvas)
        })
    }

}