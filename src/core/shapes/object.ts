import { ObjectPositioDimension } from "../@types/Object";
import { IDENTITY_METRIX } from "../math/constants";
import { angleToRadian } from "../math/trigometry";

export type ShapeBaseObjectConstructorParam = ObjectPositioDimension & {
  id: string;
};

export class ShapeBaseObject {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill = "#000000";
  borderColor = "rgba(0,0,0,0)";
  borderWidth = 0;
  scaleX = 1;
  scaleY = 1;
  angle = 0;
  opacity = 1;

  constructor({
    x,
    y,
    id,
    width = 0,
    height = 0,
  }: ShapeBaseObjectConstructorParam) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.id = id;
  }

  get border() {
    return {
      borderColor: this.borderColor,
      borderWidth: this.borderWidth,
    };
  }

  get scale() {
    return {
      scaleX: this.scaleX,
      scaleY: this.scaleY,
    };
  }

  set(
    option: Partial<
      Omit<
        ShapeBaseObject,
        | "draw"
        | "contains"
        | "toObjects"
        | "left"
        | "right"
        | "top"
        | "bottom"
        | "topLeft"
        | "topRight"
        | "bottomLeft"
        | "bottomRight"
        | "setFill"
      >
    >
  ): void {
    for (const [key, value] of Object.entries(option)) {
      (<any>this)[key] = value;
    }
  }

  resetTransform(ctx: CanvasRenderingContext2D) {
    ctx.setTransform(IDENTITY_METRIX);
  }

  transformScale(ctx: CanvasRenderingContext2D) {
    ctx.scale(this.scaleX, this.scaleY);
  }

  transformAngle(ctx: CanvasRenderingContext2D) {
    // move canvas to shape center point
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(angleToRadian(this.angle));
    // move canvas origin back to top lef
    ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);
  }

  drawStroke(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.borderColor;
    ctx.lineWidth = this.borderWidth;
  }
}
