/**
 * Created by alex on 16/08/17.
 */
import {Point} from "./Point";
import {PointList} from "./PointList";
import {Canvas} from "./Canvas";


const genPointsBtn = <any> document.getElementById("genPointsBtn");
const genPointsCount = <any>document.getElementById("genPointsCount");
const clearGenPoints = <any> document.getElementById("clearGenPoints");
const clearUserPoints = <any> document.getElementById("clearUserPoints");
const pointList = <HTMLElement> document.getElementById("pointList");
const pointXYInputList = document.querySelectorAll("input.x, input.y");

const userPoints = new PointList('#05EFFF');
const generatedPoints = new PointList('#000');

Canvas.el.addEventListener('click', (e:MouseEvent)=> {

    let mousePoint:Point = getMousePoint(e);
    userPoints.addPoint(mousePoint);
    let userPointEl:HTMLElement = mousePoint.getEl(userPoints.color, redraw);
    pointList.appendChild(userPointEl);
}, false);

clearGenPoints.addEventListener('click', (e:MouseEvent)=> {
    Canvas.clear();
    generatedPoints.clearPointList();
    userPoints.reDraw();
});

clearUserPoints.addEventListener('click', (e:MouseEvent)=> {
    Canvas.clear();
    userPoints.clearPointList();
    generatedPoints.reDraw();
    pointList.innerHTML = "";
});

genPointsBtn.addEventListener('click', (e:MouseEvent)=> {
    if (userPoints.pList.length >= 2) {

        let p1:Point = userPoints.pList[0];
        let p2:Point = userPoints.pList[1];
        let pointCount = genPointsCount.value;
        for (let i=0; i <=pointCount; i++) {
            p2 = Point.pointBetweenPoints(p1, p2);
            generatedPoints.addPoint(p2);
            p1 = userPoints.getRandomPoint();
        }
    } else alert("2 or more points are required to generate the points");
});

function getMousePoint(e:MouseEvent):Point {
    let rect:any = Canvas.el.getBoundingClientRect();
    return new Point(e.clientX - rect.left, e.clientY - rect.top);
}

function redraw():void {
    Canvas.clear();
    userPoints.reDraw();
    generatedPoints.reDraw();
}