
const cssEditor = document.getElementById('editor');
const ballsImgs = []
const ballsURL = ["Imagens/jogo/balls/ball4.svg", "Imagens/jogo/balls/ball5.svg", "Imagens/jogo/balls/ball6.svg", "Imagens/jogo/balls/ball7.svg", "Imagens/jogo/balls/ball8.svg", "Imagens/jogo/balls/ball9.svg"];
let imageCount = 0;
const goalImg = new Image()

let j = 0
let currentFrame = 4;
let objCurrentLevel;
let speed = 4
let btnClicked = false

let levels = {
    level1: {
        answers: ["justify-content: flex-end", "justify-content:flex-end"],
        goalCords: {
            goal1: {x:235, y:-10}
        },
        ballCords: {
            ball1: {x:0, y:0}
        },
        ballDirection: {x: 1, y: 0}
    },
    level2: {
        goalCords: {
            goal1: {x:0, y:235},
            goal2: {x:70, y:235},
            goal3: {x:140, y:235}
        },
        ballCords: {
            ball1: {x:0, y:0},
            ball2: {x:75, y:0},
            ball3: {x:150, y:0}
        },
        ballDirection: {x: 0, y: 1},
        answers: ["align-items: flex-end;", "align-items:flex-end;"]
    },
    level3: {
        goalCords: {
            goal1: { x: 60, y: 235 },
            goal2: { x: 140, y: 235 },
            goal3: { x: 220, y: 235 }
        },
        ballCords: {
            ball1: { x: 0, y: 0 },
            ball2: { x: 75, y: 0 },
            ball3: { x: 150, y: 0 }
        },
        ballDirection: { x: 0.33, y: 1 },
        answers: ["justify-content: center;",
        "align-items: flex-end;"], // deve colocar as duas
    },
    

    
}

document.addEventListener('DOMContentLoaded', () => {
    setup();
    goalImg.onload = () => {
        loadBallsImgs()
    }
    goalImg.src = "Imagens/jogo/goal.svg"
});


function loadBallsImgs() {

    ballsURL.forEach(src => { 
        const image = new Image()
        image.src = src;
        image.onload = ()=>{ 
            imageCount += 1;
            if(imageCount === ballsURL.length){
                initLevel(1)
            }
        }
        ballsImgs.push(image);

    });
}

function initLevel(level) {
    btnClicked = false
    j=0;
    currentFrame=4
    document.getElementById("level").innerHTML = `Nível ${level}`
    switch (level) {
        case 1:
            {
                level1()
                break;
            }
        case 2:
            {
                level2()
                break;
            }
        case 3:
            {
                level3()
                break;
            }
    }

}

function setup() {
    const codeEditor = initializeCodeEditor();

    btnNext.onclick = () => {
        if (!btnClicked) {
            checkAnswer(codeEditor)
            btnClicked = true
        }

    }

}

function initializeCodeEditor() {
    function getDefaultOptions(object) {
        const defaultOptions = {
            lineNumbers: true,
            autoCloseTags: true,
            autoCloseBrackets: true,
            theme: 'panda-syntax'
        };
        if (object) {
            const keys = Object.keys(object);
            for (const key of keys) {
                defaultOptions[key] = object[key];
            }
        }
        return defaultOptions;
    }

    const codeEditor = {

        css: CodeMirror(cssEditor, getDefaultOptions({
            mode: 'css',
            value: `.campo {\n\n}`,
            extraKeys: { 'Ctrl-Space': 'autocomplete' },
            hintOptions: {
                completeSingle: false,
                closeOnUnfocus: false
            }
        })),
    };
    return codeEditor;
}

async function checkAnswer(codeEditor) {
    let userAnswer = codeEditor.css.getValue()
    for (const rightAnswer of objCurrentLevel.answers) {
        let corrects = 0

        if (currentLevel === 3) {
            if (userAnswer.includes(rightAnswer)) {
                corrects++
            }

            if (corrects >= 2) {
                animate()
                await wait(2000)
                currentLevel = 0
                initLevel(currentLevel+1)
                return

            }
        }

        if (userAnswer.includes(rightAnswer)) {
            animate()
            await wait(2000)
            initLevel(currentLevel+1)
            return
        }


    }
    alert("Código incorreto! Tente novamente!")

}

function wait(ms) { 
    return new Promise(r => setTimeout(r, ms));
}



function animate() {
    let level = objCurrentLevel
    if (j<canvas.width-45) {
        if (currentFrame==10) currentFrame = 4
        if (currentFrame<10) {

            for (const ball in level.ballCords) {

                level.ballCords[ball].x += speed*level.ballDirection.x
                level.ballCords[ball].y += speed*level.ballDirection.y
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    drawBalls(ballsImgs[currentFrame-4], level)
                    drawGoals(goalImg, level)

                }
            }


            requestAnimationFrame(animate)
            currentFrame++
            j+=4
        }
}

function drawBalls(src, level) {
    for (const ball in level.ballCords) {
        drawBall(src, level.ballCords[ball].x, level.ballCords[ball].y)
    }
    }
function drawBall(ballImg, xStart, yStart) {
    ctx.drawImage(ballImg, xStart, yStart)
}


function drawGoals(src, level) {
    for (const goal in level.goalCords) {
        drawGoal(src, level.goalCords[goal].x, level.goalCords[goal].y)
    }
}
function drawGoal(goalImg, xStart, yStart) {
    ctx.drawImage(goalImg, xStart, yStart)
}




let currentLevel = 0
let btnNext = document.getElementById("next")
let canvas =document.getElementById("campo")
let ctx = canvas.getContext("2d")


function level1() {
    console.log("fdgfdg")
    currentLevel++
    objCurrentLevel = levels.level1
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBalls(ballsImgs[0], levels.level1)
    drawGoals(goalImg, levels.level1)

}
function level2() {
    currentLevel++
    objCurrentLevel = levels.level2

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawGoals(goalImg, levels.level2)
    drawBalls(ballsImgs[2], levels.level2)

}

function level3() {
    currentLevel++
    objCurrentLevel = levels.level3

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawGoals(goalImg, levels.level3)
    drawBalls(ballsImgs[3], levels.level3)
}

// https://cdnjs.com/libraries/codemirror