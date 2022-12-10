import { Point, Rectangle } from "./types";


export class Canvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d")!;
    }

    public clear(color?: string) {
        if (!color) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            return;
        }
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public drawRectangle(rectangle: Rectangle, color?: string) {
        this.ctx.strokeStyle = color || "black";

        this.ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    }
    public drawPoint({ x, y }: Point, color: string, weight?: number) {
        this.ctx.fillStyle = color;
        let rectWeight = weight || 1
        if (rectWeight < 1) {
            let halfWeight = rectWeight / 2
            x -= halfWeight
            y -= halfWeight
        }

        this.ctx.fillRect(x, y, rectWeight, rectWeight)
    }
}
