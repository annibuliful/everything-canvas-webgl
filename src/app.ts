import { Rectangle } from "./core/shapes/rectangle";
import { CanvasManager, Dimension } from "./core/canvas/canvasManager";
window.onload = () => {
  const canvas = document.getElementById(
    "canvas-playground"
  ) as HTMLCanvasElement;

  if (!canvas) {
    alert("Canvas Element not found");
  }

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const canvasDimension: Dimension = {
    width: windowWidth,
    height: windowHeight,
  };
  const canvasManager = new CanvasManager(canvas);
  canvasManager.setDimension(canvasDimension);
  function draw() {
    const rect2 = new Rectangle({
      x: 150,
      y: 30,
      width: 100,
      height: 100,
      id: "Rect2",
    });

    rect2.set({
      fill: "yellow",
      borderColor: "black",
      borderWidth: 3,
      scaleX: 2,
      scaleY: 2,
    });
    const rect1 = new Rectangle({
      x: 30,
      y: 30,
      width: 100,
      height: 100,
      id: "Rect1",
    });
    canvasManager.add(rect1);
    canvasManager.add(rect2);
    canvasManager.render();

    setTimeout(() => {
      canvasManager.remove(rect1.id);
      canvasManager.render();
    }, 3000);
  }

  draw();

  // resize canvas

  window.onresize = () => {
    canvasManager.setDimension(canvasDimension);
    draw();
  };
};
