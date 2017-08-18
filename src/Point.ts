/**
 * Created by alex on 16/08/17.
 */
import {Canvas} from "./Canvas";

export class Point {
    x: number;
    y: number;
    color: string;
    weight: number;

    constructor(x:number, y:number, w:number = 1, color:string = '#000') {
        this.x = x;
        this.y = y;
        this.color = color;
        this.weight = w;
    }

    draw(color:String):void {
        Canvas.ctx.strokeStyle = color;
        Canvas.ctx.strokeRect(this.x, this.y, 1,1);
    }

    getEl(color:String, cbReDraw:Function): HTMLElement {
        let pointContainer:HTMLElement =  document.createElement("div");
        let xText = document.createTextNode("x:");
        let yText = document.createTextNode("y:");
        let xInput:HTMLInputElement =  document.createElement("input");
        let yInput:HTMLInputElement =  document.createElement("input");
        yInput.value = String(this.y);
        yInput.className = "y";
        let point:Point = this;
        yInput.addEventListener('input', function(e:any) {
            point.y = Number(e.target.value);
            point.draw(color);
            cbReDraw();
        });
        xInput.value = String(this.x);
        xInput.className = "x";
        xInput.addEventListener('input', function(e:any) {
            point.x = Number(e.target.value);
            point.draw(color);
            cbReDraw();
        });
        pointContainer.appendChild(xText);
        pointContainer.appendChild(xInput);
        pointContainer.appendChild(yText);
        pointContainer.appendChild(yInput);

        return pointContainer;
    }

    static pointBetweenPoints(p1:Point, p2:Point):Point {
        let xOut = (p1.x + p2.x)/2;
        let yOut = (p1.y + p2.y)/2;

        return new Point(xOut, yOut);
    }
}
