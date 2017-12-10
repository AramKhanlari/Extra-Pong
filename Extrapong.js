const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const rand = function(num)
{
	return Math.floor(Math.random() * num) + 1;
};

const rand1 = function(num, leftOrUpperBound , rightOrLowerBound)
{
	const result = Math.floor(Math.random() * num);
        if(!(result >= leftOrUpperBound && result <= rightOrLowerBound))
		{
            rand1(num, leftOrUpperBound , rightOrLowerBound);
        } 
        return result;
};

const drawBall = function(radius, x, y, color) 
{
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0,2*Math.PI);
    ctx.fill();
};

const sign = [ 0,-1, 1];
let count1 = 0;
let count2 = 0;

const p1 = 
{
    x: 0,
    y: canvas.height/2,
    move: 50,
    width: 20,
    height: 100,
    color: "blue"    
};

const p2 = 
{
    x: canvas.width - 20,
    y: canvas.height/2,
    move: 50,
    width: 20,
    height: 100,
    color: "lime"
};

const ball = 
{
    move: true,
    r: 10,
    x: rand1(canvas.width, canvas.width/3, 2 * canvas.width/3),
    y: rand1(canvas.height, 30, canvas.height - 30),
    xdelta: sign[rand(2)] * 3,
    ydelta: sign[rand(2)] * rand(10),
	color: "red"
};

document.addEventListener('keydown', function(event) 
{
	if(event.keyCode === 87) //w
	{
		p1.y -= p1.move;
		if(p1.y < 0) 
		{
			p1.y = 0;
		}
	};
	if(event.keyCode === 83) //s
	{
		p1.y += p1.move;
		if(p1.y > canvas.height - p1.height) 
		{
			p1.y = canvas.height - p1.height;
		}
	};
	if(event.keyCode === 80) //p
	{
		p2.y -= p2.move;
		if(p2.y < 0) 
		{
			p2.y = 0;
		}
  	};
	if(event.keyCode === 76) //l
	{
		p2.y += p2.move;
		if(p2.y > canvas.height - p2.height) 
		{
			p2.y = canvas.height - p2.height;
		}
	};
	if(event.keyCode === 32  && !ball.move) //space
	{
		location.reload();
	} 
	else if(event.keyCode === 32 && ball.move) //space
	{
		ball.move = false;
		ball.xdelta = ball.ydelta = 0;
	};
}, false);

const count = function() 
{
	ctx.font = "80px Verdana";
    const writeCount = function() 
	{
        ctx.fillStyle = "Aqua";
        ctx.fillText(count1, canvas.width/4, 70);
        ctx.fillText(count2, 3 * canvas.width/4, 70);
    };  
    if(ball.x + ball.r < 0) 
	{
        count2 ++;
        ball.x = p1.x + p1.width + 2 * ball.r;
        ball.y = p1.y + p1.height/2;
        ball.xdelta = 8;
        ball.ydelta = sign[rand(2)] * rand(10);
    } 
	else if(ball.x - ball.r > canvas.width) 
	{
        count1 ++;
		ball.x = p2.x - 2 * ball.r;
        ball.y = p2.y + p2.height/2;
        ball.xdelta = -8;
        ball.ydelta = sign[rand(2)] * rand(10);
    };
    writeCount();
};

const update = function() 
{
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = p1.color;
    ctx.fillRect(p1.x, p1.y, p1.width, p1.height);
    ctx.fillStyle = p2.color;
    ctx.fillRect(p2.x, p2.y, p2.width, p2.height);
    ball.x += ball.xdelta;
    ball.y += ball.ydelta;
    if(ball.y - ball.r < 0 || ball.y + ball.r > canvas.height ) 
	{
		ball.ydelta = -ball.ydelta;
    };
    if((ball.x + ball.r >= p2.x - p2.width && ball.y + ball.r <= p2.y + p2.height && ball.y - ball.r >= p2.y)
		||
		(ball.x - ball.r <= p1.width && ball.y - ball.r >= p1.y && ball.y + ball.r <= p1.y + p1.height)) 
	{
        ball.xdelta = -ball.xdelta;
    };
    drawBall(ball.r, ball.x, ball.y, ball.color);
};

const findWinner = function() 
{	
	ctx.font = "80px Verdana";
	if(count1 === 15 || count2 === 15)
	{
		if(count1 === 15) 
		{
			ctx.fillStyle = p1.color;
			ctx.fillText("Player 1 has won!", canvas.width/3, canvas.height/2);
		};
		if(count2 === 15) 
		{
			ctx.fillStyle = p2.color;
			ctx.fillText("Player 2 has won!", canvas.width/3, canvas.height/2);
		}; 
		ctx.fillStyle = "red";
		ctx.fillText("Press SPACE to Play Again", canvas.width/4, 
		canvas.height/2 + 80);
		ball.move = false;
		ball.xdelta = ball.ydelta = 0;
	}
}; 

const Pong = function() 
{
    update();
    count();
    findWinner();
    requestAnimationFrame(Pong);
};
Pong();