const taskContainer = document.querySelector('.tasks-container');
submitBtn = document.querySelector('.submit-button');
const timeLeftDisplay = document.getElementById('time-left');
const sliderFill = document.querySelector('circle');
const btnPromodoro = document.getElementById('btn-promodoro');
const btnShort = document.getElementById('btn-short-break');
const shortBreak = document.querySelector('.play-container');




console.log(taskContainer)
let startCount = 5;
let breakCount = 15*60;
let breakLeft = breakCount;
let timeLeft = startCount;
let timeId;
let breakId;
let tasks = [
    {
        name: "practice CSS Animations",
        priority: 4
    },
    {
        name: "play Code Of War",
        priority: 1
    },
    {
        name: "Algorithm Studies",
        priority: 3
    },
]

//filter by priority
const descendingTasks = tasks.sort((a, b) => a.priority - b.priority);
console.log(descendingTasks);
btnPromodoro.style.color='red'
function red(){
    
        btnPromodoro.style.color='red'
        btnShort.style.color='white'
        shortBreak.classList.add('hide')
        
    
}

function white(){
    
        btnPromodoro.style.color='white'
        btnShort.style.color='red'
        shortBreak.classList.remove('hide')
          
    
}

btnPromodoro.addEventListener('click',red)
btnShort.addEventListener('click',white)

function convertToMin(secondsLeft) {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft - minutes * 60;
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function handleClick(btn) {
    const running = sliderFill.style.animationPlayState || 'running';
    switch (btn.textContent) {
        case 'ACTIVE':
            btn.textContent = 'PAUSED';
            clearInterval(timeId);
            sliderFill.style.animationPlayState = running === 'running' ? 'paused' : 'running';

            break;
        case 'PAUSED':
            btn.textContent = 'ACTIVE';
            sliderFill.style.animationPlayState = running === 'running' ? 'paused' : 'running';
            sliderFill.style.setProperty('--c', timeLeft + 2)
            countDown(btn);
            break;
        default:
            const allBtn = document.querySelectorAll('.controller-btn');
            allBtn.forEach(btn => {
                btn.textContent = 'START';
                btn.classList.remove('active');
            });
            btn.textContent = 'ACTIVE';
            btn.classList.add('active-btn');
            clearInterval(timeId);
            timeLeft = startCount;
            timeLeftDisplay.textContent = convertToMin(timeLeft);
            sliderFill.style.setProperty('--c', "")

            countDown(btn);
            break;

    }



}

function countDown(btn) {
    timeId = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = convertToMin(timeLeft);
        sliderFill.style.setProperty('--c', startCount);

        if (timeLeft <= 0) {
            clearInterval(timeId);
            console.log(btn.id);
            delete descendingTasks[btn.id];
            btn.parentNode.remove();
            console.log(tasks);
            timeLeft = startCount;
            timeLeftDisplay.textContent = convertToMin(timeLeft);
            sliderFill.style.setProperty('--c', '');
        }
    }, 1000);
}


function breakDown() {
    breakId = setInterval(() => {
        breakLeft--;
        timeLeftDisplay.textContent = convertToMin(breakLeft);
        sliderFill.style.setProperty('--c', breakCount);

        if (breakLeft <= 0) {
            clearInterval(breakId);
            breakLeft = breakCount;
            timeLeftDisplay.textContent = convertToMin(breakLeft);
            sliderFill.style.setProperty('--c', '');
        }
    }, 1000);
}


function render() {
    descendingTasks.forEach((task, index) => {
        const divElt = document.createElement('div');
        const imgDelete = document.createElement('img');
        const p = document.createElement('p');
        const btn = document.createElement('button');
        const playBtn = document.createElement('img');

        divElt.classList.add('tasks-block');
        imgDelete.classList.add('delete-icon');
        btn.classList.add('controller-btn');

        imgDelete.setAttribute('src', '/images/delete.svg');
        imgDelete.setAttribute('alt', 'delete icon');
        btn.textContent = 'START'
        /* playBtn.setAttribute('src', '/images/play.svg');
        playBtn.setAttribute('alt', 'play icon');
        playBtn.classList.add('play-btn'); */

        p.innerText = task.name;


        btn.id = index;

        function deleteTask(e) {
            task = e.target.parentNode;
            console.log(e.target.parentNode);
            task.remove();
            delete descendingTasks[e.target.parentNode.lastChild.id];
            console.log(tasks)

        }

        function addTask() {
            const inputElt = document.querySelector('input');
            const value = inputElt.value;
            console.log(value);
            if (value) {
                taskContainer.innerHTML = "";
                inputElt.value = "";
                tasks.push({
                    name: value,
                    priority: tasks.length
                });
                render();
            }
        };
        submitBtn.addEventListener('click', addTask)
        imgDelete.addEventListener('click', deleteTask)
        btn.addEventListener('click', () => handleClick(btn));
        shortBreak.addEventListener('click', breakDown)

        taskContainer.append(divElt);
        divElt.append(imgDelete, p, btn);
        /* btn.append(playBtn) */;

    })


}

render()










