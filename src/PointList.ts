/**
 * Created by alex on 16/08/17.
 */
import {Point} from "./Point";

export class PointList {
    pList:Point[];
    color:String;

    constructor(color:String) {
        this.pList = [];
        this.color = color;
    }

    addPoint(p:Point): void {
        this.pList.push(p);
        p.draw(this.color);
    }
    clearPointList(): void {
        this.pList = [];
    }
    getRandomPoint(): Point {
        return this.pList[Math.floor(Math.random() * this.pList.length)];
    }
    reDraw(): void {
        this.pList.forEach((p: Point, i: number, a: Point[])=> {
            p.draw(this.color);
        });
    }
}