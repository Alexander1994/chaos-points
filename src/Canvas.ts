/**
 * Created by alex on 16/08/17.
 */
export class Canvas {
    static el: any =  (document.getElementById("canvasEl") as any);
    static ctx: any =  Canvas.el.getContext("2d");

    static clear():void {
        Canvas.ctx.clearRect(0, 0, Canvas.el.width, Canvas.el.height);
    }
    static canvasYToLogicalY(y:number):number {
        return Canvas.el.height - y;
    }
    static logicalYToCanvasY(y:number):number {
        return Canvas.el.height - y;
    }
    static validX(x:number):boolean {
        return x >= 0 && x<= Canvas.el.width;
    }
    static validCanvasY(y:number):boolean {
        return y >= 0 && y <= Canvas.el.height;
    }
}