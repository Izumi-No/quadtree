import { Point, Rectangle } from "./types"


export function contains(rect: Rectangle, point: Point) {
    return point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height
}

export function intersects(rectA: Rectangle, rectB: Rectangle) {
    let rectACenter: Point = { x: rectA.x + rectA.width / 2, y: rectA.y + rectA.height / 2 }, rectBCenter: Point = { x: rectB.x + rectB.width / 2, y: rectB.y + rectB.height / 2 }

    let diffX = Math.abs(rectACenter.x - rectBCenter.x)
    let diffY = Math.abs(rectACenter.y - rectBCenter.y)

    let dx = rectA.width / + rectB.width / 2
    let dy = rectA.height / + rectB.height / 2

    return diffX <= dx && diffY <= dy
}