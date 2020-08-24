//    Tutorial Videos
//    https://www.youtube.com/watch?v=gNA6HKRWAI0
//    https://www.youtube.com/watch?v=zlKXZiWE1XI

function lineBounce(line, ball) {
    let point1 = line[0]
    let point2 = line[1]

    // point1.debugDraw(ctx)
    // point2.debugDraw(ctx)
    let lineVector = point2.minus(point1)
    let point1ToBall = ball.position.minus(point1)
    let projection = point1ToBall.clampedProj(lineVector)
    let displacement = point1ToBall.minus(projection)
    
    let distance = displacement.norm()
    let overlap = ball.radius - distance
    
    if (distance <= ball.radius) {
        ball.velocity.reflect(displacement)
        displacement.setNorm(overlap)
        ball.position.add(displacement)
    }
    
    
    lineVector.debugDraw(ctx, point1)
    point1ToBall.debugDraw(ctx, point1, 1, false, 'gold')
    projection.debugDraw(ctx, point1, 1, false, 'aqua')
    displacement.debugDraw(ctx, point1.plus(projection), 1, false, 'tomato')
}

function createPaddle({ x, y0, width, height, upKey, downKey, minY, maxY, hitSide }) {
    let y = y0
    let velocity = 0

    window.addEventListener('keydown', function (e) {
        let key = e.key

        if (key === upKey) {
            velocity = -0.5
        } else if (key === downKey) {
            velocity = 0.5
        }
    })
    window.addEventListener('keyup', function (e) {
        let key = e.key

        if (key === upKey || key === downKey) {
            velocity = 0
        }
    })

    function move(dt) {
        y += velocity*dt
        y = Math.min(y, maxY)
        y = Math.max(y, minY)
    }
    
    function draw(ctx) {
        ctx.fillStyle = 'white'
        ctx.fillRect(x - width/2, y - height/2, width, height)
    }

    function getHitLine() {
        if (hitSide === 'left') {
            return [
                V(x - width/2, y - height/2),
                V(x - width/2, y + height/2)
            ]
        } else if (hitSide === 'right') {
            return [
                V(x + width/2, y - height/2),
                V(x + width/2, y + height/2)
            ]
        }
    }

    function checkHit(ball) {
        let hitLine = getHitLine()
        lineBounce(hitLine, ball)
    }
    
    return {
        move,
        draw,
        checkHit
    }
}
