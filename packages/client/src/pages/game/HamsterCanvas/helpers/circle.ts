const color = ['#6600CC', '#FFCC00', '#9EA9F0', '#CC0000']

export class Circle {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
  color: string

  constructor(x: number, y: number, dx: number, dy: number, radius: number) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color[Math.floor(Math.random() * color.length)]
  }

  draw(context: CanvasRenderingContext2D | null) {
    if (context) {
      context.beginPath()
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      context.fillStyle = this.color
      context.fill()
      context.stroke()
    }
  }

  update(
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    mouse: { x: number; y: number },
    maxRadius: number,
    minRadius: number
  ) {
    this.draw(context)
    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
      this.dx = -this.dx
    }
    if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
      this.dy = -this.dy
    }
    this.x += this.dx
    this.y -= this.dy

    if (
      mouse.x &&
      mouse.y &&
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50 &&
      this.radius < maxRadius
    ) {
      this.radius += 1
    } else if (this.radius > minRadius) {
      this.radius -= 1
    }
  }
}
