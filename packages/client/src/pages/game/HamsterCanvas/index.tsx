import { FC,useEffect, useRef } from 'react'

import hamster from './hamster.png'
import { Circle } from './helpers/circle'

import './HamsterCanvas.css'

const arcCenterX = 210
const arcCenterY = 210
const arcRadius = 200

interface Props {
  onClickCircle: () => void
}

const maxRadius = 20
const minRadius = 2

export const HamsterCanvas: FC<Props> = ({ onClickCircle }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const canvasRefImage = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const context = canvas.getContext('2d')

      if (context) {
        const mouse: { x?: number; y?: number } = {
          x: undefined,
          y: undefined,
        }

        window.addEventListener('click', function (event) {
          mouse.x = event.x
          mouse.y = event.y
        })

        window.addEventListener('resize', function () {
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
          init()
        })

        const circleArray = [] as Array<Circle>

        const init = () => {
          for (let i = 0; i < 900; i++) {
            const r = Math.floor(Math.random() * 3) + 1
            const x = Math.random() * (innerWidth - r * 2) + r
            const y = Math.random() * (innerHeight - r * 2) + r
            const dx = (Math.random() - 0.5) * 5
            const dy = (Math.random() - 0.5) * 5

            circleArray.push(new Circle(x, y, dx, dy, r))
          }
        }

        const animate = () => {
          requestAnimationFrame(animate)
          context.clearRect(0, 0, innerWidth, innerHeight)
          for (let i = 0; i < circleArray.length; i++) {
            circleArray[i].update(
              context,
              canvas,
              mouse as { x: number; y: number },
              maxRadius,
              minRadius
            )
          }
        }

        animate()
        init()
      }
    }
  }, [])

  useEffect(() => {
    if (canvasRefImage.current) {
      const canvasImage = canvasRefImage.current
      const ctx = canvasImage.getContext('2d')

      canvasImage.width = window.innerHeight / 2
      canvasImage.height = window.innerHeight / 2

      if (ctx) {

        const hamsterImage = new Image()

        hamsterImage.src = hamster // Путь к изображению хомяка

        hamsterImage.onload = () => {
          ctx.beginPath()
          ctx.arc(arcCenterX, arcCenterY, arcRadius, 0, 2 * Math.PI)
          ctx.lineWidth = 8

          const gradient = ctx.createLinearGradient(20, 0, 400, 0)

          gradient.addColorStop(0, '#313366')
          gradient.addColorStop(0.5, '#4a54cd')
          gradient.addColorStop(1, '#313366')

          ctx.strokeStyle = '#1C0146'
          ctx.fillStyle = gradient
          ctx.fill()
          ctx.stroke()
          ctx.drawImage(hamsterImage, 0, 0, 400, 400) // Рисуем хомяка на canvas
        }
      }
    }
  }, [])

  const onClickHamster = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (canvasRefImage.current) {
      const rect = canvasRefImage.current.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      // Проверяем, находится ли точка клика внутри круга
      const distanceFromCenter = Math.sqrt(
        Math.pow(x - arcCenterX, 2) + Math.pow(y - arcCenterY, 2)
      )

      if (distanceFromCenter <= arcRadius) {
        // Точка клика находится внутри круга
        onClickCircle()
      }
    }
  }

  return (
    <div className="wrapper">
      <canvas ref={canvasRef} className="canvas" />
      <canvas
        ref={canvasRefImage}
        className="canvas_image"
        onClick={onClickHamster}
      />
    </div>
  )
}
