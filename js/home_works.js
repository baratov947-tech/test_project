const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

gmailButton.addEventListener('click', () => {
    const regExp = /^[a-zA-Z0-9._-]+@gmail\.com$/;

    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = 'Успешно!';
        gmailResult.style.color = 'green';
    } else {
        gmailResult.innerHTML = 'Ошибка! Нужен @gmail.com';
        gmailResult.style.color = 'red';
    }
});

const childBlock = document.querySelector('.child_block');
const parentBlock = document.querySelector('.parent_block');

let positionX = 0;
const maxLeft = parentBlock.offsetWidth - childBlock.offsetWidth;

const moveBlock = () => {
    if (positionX < maxLeft) {
        positionX += 2;
        childBlock.style.left = `${positionX}px`;
        requestAnimationFrame(moveBlock);
    }
};

moveBlock();