/**
 * Created by alex on 16/08/17.
 */
export class Canvas {
    static el: any =  (document.getElementById("canvasEl") as any);
    static ctx: any =  Canvas.el.getContext("2d");

    static clear():void {
        Canvas.ctx.clearRect(0, 0, Canvas.el.width, Canvas.el.height);
    }
}