let gameSeq = []
let userSeq = []
let started = false ; 
let level = 0;
let highScore =0 ;
let h2 = document.querySelector("h2");
let colors = ['red','yellow','green','purple'];

document.addEventListener('keypress',function () {
	if(started==false) {
		console.log("Game started");
		started = true;
	}
	levelUp();
})

function levelUp() {
	userSeq = []
	level++;
	h2.innerText = `level ${level}`
	let randIx = Math.floor(Math.random()*4);
	let randColor = colors[randIx];
	let colorflash = document.querySelector(`.${randColor}`);
	gameSeq.push(randColor);
	console.log(gameSeq);
	colorFlash(colorflash);
}

function checkAns(idx) {
	if(gameSeq[idx] === userSeq[idx]) {
		if(gameSeq.length == userSeq.length) {
			setTimeout(levelUp,1000);
		}
	} else {
		h2.innerText = `Game over! your score is ${level}.Press any key to restart`
		level = 0;
		gameSeq = [];
		document.querySelector("body").style.backgroundColor = "red";
		setTimeout(function() {
			document.querySelector("body").style.backgroundColor = "white";
		},150)
		if(highScore<level) {
			highScore = level;
		}
	}
}

function colorFlash(color) {
	color.classList.add("flash");
	setTimeout(()=>{
		color.classList.remove("flash")
	},250)
}

let btns = document.querySelectorAll('.btn');

function btnFlash() {
	this.classList.add("flash");
	setTimeout(()=>{
		this.classList.remove("flash");
	},250)
	userSeq.push(this.getAttribute('id'));
	checkAns(userSeq.length-1);
}
for(btn of btns) {
	btn.addEventListener('click',btnFlash)
}

document.querySelector("h3").innerHTML = `Highest score : ${highScore}`