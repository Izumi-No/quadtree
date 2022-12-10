export type Point = {
    x: number,
    y: number
}

export type Rectangle = {
    x: number,
    y: number,
    width: number,
    height: number
}

export type Player = Point & {score: number}
export type PlayerHashMap = {[id: string]: Player }





export type Fruit = Point

export type FruitHashMap = {[id: string]: Fruit } 

