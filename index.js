let canvasEl = document.querySelector('#mycanvas')
let context = canvasEl.getContext('2d')
let eraserEl = document.querySelector('#eraser')
let brushEl = document.querySelector('#brush')
let blackEl = document.querySelector('#black')
let redEl = document.querySelector('#red')
let blueEl = document.querySelector('#blue')
let greenEl = document.querySelector('#green')
let thinEl = document.querySelector('#thin')
let thickEl = document.querySelector('#thick')
let colorsLiEls = document.querySelectorAll('ol.colors > li')
let clearEl = document.querySelector('#clear')
let saveEl = document.querySelector('#save')
let sizesLiEls = document.querySelectorAll('ol.sizes > li')

let lineWidth = 5
let using = false
let isErase = false
let lastPos = {
    x: undefined,
    y: undefined
}

autoSetCanvasSize(canvasEl)

listenToUser(canvasEl, context)

bindSwitchEventHandlers(brushEl, eraserEl)

bindColorsHandlers()

bindSizesHandlers()

bindClearHandler();

saveEl.onclick = function() {
    let url = canvasEl.toDataURL('image/png')
    let a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'Result'
    a.target = '_blank'
    a.click()
}

function bindClearHandler() {
    clearEl.onclick = function () {
        context.clearRect(0, 0, canvasEl.width, canvasEl.height)
    }
}

function bindSizesHandlers() {
    thinEl.onclick = function () {
        lineWidth = 5
    }
    thickEl.onclick = function () {
        lineWidth = 10
    }
}

function bindColorsHandlers() {
    redEl.onclick = function () {
        context.fillStyle = 'red'
        context.strokeStyle = 'red'

        colorsLiEls.forEach((liEl) => {
            liEl.classList.remove('active')
        })
        redEl.classList.add('active')
    }

    greenEl.onclick = function () {
        context.fillStyle = 'green'
        context.strokeStyle = 'green'
        colorsLiEls.forEach((liEl) => {
            liEl.classList.remove('active')
        })
        greenEl.classList.add('active')
    }

    blueEl.onclick = function () {
        context.fillStyle = 'blue'
        context.strokeStyle = 'blue'
        colorsLiEls.forEach((liEl) => {
            liEl.classList.remove('active')
        })
        blueEl.classList.add('active')
    }

    blackEl.onclick = function () {
        context.fillStyle = 'black'
        context.strokeStyle = 'black'
        colorsLiEls.forEach((liEl) => {
            liEl.classList.remove('active')
        })
        blackEl.classList.add('active')
    }
}

function bindSwitchEventHandlers(brushEl, eraserEl) {
    brushEl.onclick = function () {
        isErase = false
        brushEl.classList.add('active')
        eraserEl.classList.remove('active')
    }
    eraserEl.onclick = function () {
        isErase = true
        eraserEl.classList.add('active')
        brushEl.classList.remove('active')
    }
}

function autoSetCanvasSize(canvasEl) {
    setCanvasSize(canvasEl)

    window.onresize = function () {
        setCanvasSize(canvasEl)
    }
}

function listenToUser(canvasEl, context) {
    if (document.body.ontouchstart !== undefined) {
        bindTouchEventHandlers(canvasEl, context)
    }
    else {
        bindMouseEventHandlers(canvasEl, context)
    }
}

function bindMouseEventHandlers(canvasEl, context) {
    // mouse
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

function bindTouchEventHandlers(canvasEl, context) {
    canvasEl.ontouchstart = function (event) {
        let x = event.touches[0].clientX
        let y = event.touches[0].clientY

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

    canvasEl.ontouchmove = function (event) {
        if (!using) {
            return
        }
        let x = event.touches[0].clientX
        let y = event.touches[0].clientY
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

    canvasEl.ontouchend = function (event) {
        using = false
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
    context.lineWidth = lineWidth
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}