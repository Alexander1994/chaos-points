/**
 * Created by alex on 16/08/17.
 */
import {Canvas} from "./Canvas";

export class Point {
    x: number;
    y: number;
    color: string;
    weight: number;

    constructor(x:number, y:number, w:number = 0.5, color:string = '#333') {
        this.x = (Canvas.validX(x)) ? x : 0;
        this.y = (Canvas.validCanvasY(y)) ? y : 0;
        this.color = color;
        if (!this.setWeight(w)) this.weight = 0.5;
    }

    draw(color:String):void {
        Canvas.ctx.strokeStyle = color;
        Canvas.ctx.strokeRect(this.x, this.y, 1,1);
    }

    equals(p:Point):boolean {
        return this.x === p.x && this.y === p.y;
    }

    getEl(color:String, cbReDraw:Function): HTMLElement {
        let pointContainer:HTMLElement =  document.createElement("div");
        let xText = document.createTextNode("x:");
        let yText = document.createTextNode("y:");
        let wText = document.createTextNode("Set Weight");

        let xInput:HTMLInputElement =  document.createElement("input");
        let yInput:HTMLInputElement =  document.createElement("input");
        let wInput:HTMLInputElement =  document.createElement("input");
        let wSet:HTMLButtonElement = document.createElement("button");

        yInput.value = String(Canvas.canvasYToLogicalY(this.y));
        yInput.className = "y";
        let point:Point = this;

        yInput.addEventListener('input', function(e:any) {
            let y = Number(e.target.value);
            if (Canvas.validCanvasY(y)) {
                point.y = Canvas.logicalYToCanvasY(y);
                cbReDraw();
            } else {
                alert("Invalid Y");
                yInput.value = String(Canvas.canvasYToLogicalY(point.y));
            }
        });
        xInput.value = String(this.x);
        xInput.className = "x";

        xInput.addEventListener('input', function(e:any) {
            let x = Number(e.target.value);
            if (Canvas.validX(x)) {
                point.x = x;
                cbReDraw();
            } else {
                alert("Invalid X");
                xInput.value = String(point.x);
            }
        });
        wInput.value = String(this.weight);
        wInput.className = "w";
        wSet.appendChild(wText);

        wSet.addEventListener('click', function(e:any) {
            if (!point.setWeight(Number(wInput.value))) {
                alert("Weight not set, weight must be greater than 0 and less than or equal to 1");
                wInput.value = String(point.weight);
            }
        });
        pointContainer.appendChild(xText);
        pointContainer.appendChild(xInput);
        pointContainer.appendChild(yText);
        pointContainer.appendChild(yInput);
        pointContainer.appendChild(wSet);
        pointContainer.appendChild(wInput);

        return pointContainer;
    }

    setWeight(w:number):boolean {
        if (Point.isValidWeight(w))  {
            this.weight = w;
            return true;
        }
        return false
    }

    static pointBetweenPoints(p1:Point, p2:Point):Point {
        let xOut = p2.x + (p1.x - p2.x) * (p1.weight + p2.weight)/2;
        let yOut = p2.y + (p1.y - p2.y) * (p1.weight + p2.weight)/2;
        return new Point(xOut, yOut);
    }

    static isValidWeight(w:number): boolean {
        return w <= 1 && w >0;
    }
}
