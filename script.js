let TabPos = []
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 8; j++) {
        const x = 107 + j * 217;
        const y = 150 + i * 234;
        TabPos.push([x, y]);
    }
}

function Shuffle() {
    let cardsContainer = document.querySelector(".cards");
    const cards = cardsContainer.querySelectorAll(".card");
    let cardsArray = Array.from(cards);
    cardsContainer.innerHTML = '';
    cardsArray.sort(function () {
        return 0.5 - Math.random();
    });
    cardsArray.forEach(function (card) {
        cardsContainer.appendChild(card);
    });
}
function Cover() {
    for (let i = 0; i < 24; i++) {
        TabOb[i].innerHTML = '<img src="back.jpg">';
    }
}

function Reveal(a) {
    for (let i = 0; i < 24; i++) {
        if (a === TabOb[i]) {
            a.innerHTML = TabImg[i];
            break;
        }
    }
}

let k = 0;
let one;
let counter = 0;
let islocked = false;

function LockGame() {
    if (islocked == false) {
        document.querySelectorAll('.card').forEach(card => {
            card.removeEventListener('click', Click);
        });
    } else {
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', Click);
        });
    }
}


function Click(event) {
    let x = event.target;
    if (x.classList.contains('card')) {
        Play(x);
    }
}

function Play(x) {
    if (k === 0) {
        LockGame();
        Cover();
        Reveal(x);
        k = 1;
        one = x;
        LockGame();
    } else if (k === 1) {
        LockGame();
        Reveal(x);
        if (one !== x) {
            k = 2;
            if (one.innerHTML === x.innerHTML) {
                setTimeout(function () {
                    one.style.visibility = 'hidden';
                    x.style.visibility = 'hidden';
                    k = 0;
                    counter += 2;
                    CheckWin();
                    LockGame();
                }, 500);
            } else {
                setTimeout(function () {
                    Cover();
                    k = 0;
                    LockGame();
                }, 500);
            }
        } else {
            setTimeout(function () {
                Cover();
                k = 0;

                LockGame();
            }, 500);
        }
    }
    CheckWin();
}

function CheckWin() {
    if (counter === 24) {
        ShowModal();
    }
}
function ShowModal() {
    document.getElementById('popup').style.display = 'flex';
    document.getElementById('guibuttons').style.display = 'none';
}

function PlayAgain() {
    location.reload();
}

let TabOb = document.querySelectorAll('.card');
let TabImg = [];
for (let i = 0; i < 24; i++) {
    TabImg[i] = TabOb[i].innerHTML;
}