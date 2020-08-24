//    Tutorial Videos
//    https://www.youtube.com/watch?v=gNA6HKRWAI0
//    https://www.youtube.com/watch?v=zlKXZiWE1XI

const PLAYER_1_SCORE = document.querySelector('#player-1 .score')
const PLAYER_2_SCORE = document.querySelector('#player-2 .score')

const canvas = {
    elem: document.getElementById('canvas'),
    width: 800,
    height: 800
}
const ctx = canvas.elem.getContext('2d')
canvas.elem.width = canvas.width
canvas.elem.height = canvas.height

const dt = 20
const ball = {
    radius: 30,
    position: V(300, 200),
    velocity: V(0.1, 0.2),
    color: 'rgb(182, 60, 60)'
}

const player1 = createPaddle({
    x: 50,
    y0: canvas.height/2,
    width: 16,
    height: 80,
    upKey: 'w',
    downKey: 's',
    minY: 50,
    maxY: canvas.height - 50,
    hitSide: 'right'
})
const player2 = createPaddle({
    x: canvas.width - 50,
    y0: canvas.height/2,
    width: 16,
    height: 80,
    upKey: 'ArrowUp',
    downKey: 'ArrowDown',
    minY: 50,
    maxY: canvas.height - 50,
    hitSide: 'left'
})

animate()   // Starts animation

function animate() {
    setTimeout(animate, dt)
    frame()
}
function frame() {
    player1.move(dt)
    player2.move(dt)
    moveCircle()
    
    checkEdgeBounce()
    player1.checkHit(ball)
    player2.checkHit(ball)

    draw()
}



function moveCircle() {
    // Position = Initial Position + Velocity * deltaTime
    ball.position.add(ball.velocity.times(dt))
}
function checkEdgeBounce() {
    if/***/ (ball.position.y >= canvas.height-ball.radius) ball.velocity.y = -ball.velocity.y  // Bottom
    else if (ball.position.y <= ball.radius/*****/) ball.velocity.y = -ball.velocity.y  // Top
    
    if/***/ (ball.position.x >= canvas.width-ball.radius) scorePoint(1) // Right wall
    else if (ball.position.x <= ball.radius/****/) scorePoint(2)        // Left wall
}

// Canvas functions
function draw() {
    clearCanvas()
    drawCircle(ball.position.x, ball.position.y, ball.radius, ball.color)
    player1.draw(ctx)
    player2.draw(ctx)
}
function drawCircle(x, y, r, color) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2*Math.PI)
    ctx.fill()
}
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function scorePoint(player) {
    if/***/ (player === 1) PLAYER_1_SCORE.innerText = parseInt(PLAYER_1_SCORE.innerHTML) + 1
    else if (player === 2) PLAYER_2_SCORE.innerText = parseInt(PLAYER_2_SCORE.innerHTML) + 1

    restart()
}

function restart() {
    ball.velocity.set(0, 0)
    ball.position.set(canvas.width/2, canvas.height/2)

    setTimeout(() => {
        ball.velocity.randomize(0.4)
    }, 500)
}
