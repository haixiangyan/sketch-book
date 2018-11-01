let canvasEl = document.querySelector('#mycanvas')
let context = canvasEl.getContext('2d')
let eraserEl = document.querySelector('#eraser')
let brushEl = document.querySelector('#brush')
let actionsEl = document.querySelector('.actions')
let using = false
let isErase = false
let lastPos = {
    x: undefined,
    y: undefined
}

autoSetCanvasSize(canvasEl)

setMouseListeners(canvasEl, context)

initEraser(eraserEl, brushEl, actionsEl)

function autoSetCanvasSize(canvasEl) {
    setCanvasSize(canvasEl)

    window.onresize = function () {
        setCanvasSize(canvasEl)
    }
}

function setMouseListeners(canvasEl, context) {
    canvasEl.onmousedown = function (event) {
        let x = event.clientX
        let y = event.clientY

        using = true

        if (isErase) {
            context.clearRect(x, y, 10, 10)
        } else {
            lastPos = {
                x,
                y
            }
        }
    }

    canvasEl.onmousemove = function (event) {
        if (!using) {
            return
        }
        let x = event.clientX
        let y = event.clientY
        if (isErase) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            drawLine(lastPos.x, lastPos.y, x, y)
            lastPos = {
                x,
                y
            }
        }
    }

    canvasEl.onmouseup = function (event) {
        using = false
    }
}

function initEraser(eraserEl, brushEl, actionsEl) {
    eraserEl.onclick = function () {
        isErase = true
        actionsEl.className = 'actions is-painting'
    }
    brushEl.onclick = function () {
        isErase = false
        actionsEl.className = 'actions'
    }
}

function setCanvasSize(canvasEl) {
    canvasEl.width = document.documentElement.clientWidth
    canvasEl.height = document.documentElement.clientHeight
}

function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineWidth = 5
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}