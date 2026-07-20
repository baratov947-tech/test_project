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
let positionY = 0;

const maxLeft = parentBlock.offsetWidth - childBlock.offsetWidth;
const maxTop = parentBlock.offsetHeight - childBlock.offsetHeight;

const moveBlock = () => {
    if (positionX < maxLeft && positionY === 0) {
        positionX += 2;
        if (positionX > maxLeft) positionX = maxLeft;
        childBlock.style.left = `${positionX}px`;
    }
    else if (positionX === maxLeft && positionY < maxTop) {
        positionY += 2;
        if (positionY > maxTop) positionY = maxTop;
        childBlock.style.top = `${positionY}px`;
    }
    else if (positionX > 0 && positionY === maxTop) {
        positionX -= 2;
        if (positionX < 0) positionX = 0;
        childBlock.style.left = `${positionX}px`;
    }
    else if (positionX === 0 && positionY > 0) {
        positionY -= 2;
        if (positionY < 0) positionY = 0;
        childBlock.style.top = `${positionY}px`;
    }

    requestAnimationFrame(moveBlock);
};

moveBlock();

const secondsBlock = document.querySelector('#seconds');
const btnStart = document.querySelector('#start');
const btnStop = document.querySelector('#stop');
const btnReset = document.querySelector('#reset');

let count = 0;
let interval = null;

btnStart.addEventListener('click', () => {
    if (!interval) {
        interval = setInterval(() => {
            count++;
            secondsBlock.textContent = count;
        }, 1000);
    }
});

btnStop.addEventListener('click', () => {
    clearInterval(interval);
    interval = null;
});

btnReset.addEventListener('click', () => {
    clearInterval(interval);
    interval = null;
    count = 0;
    secondsBlock.textContent = count;
});

const myPromise = new Promise((resolve, reject) => {
    const isSuccess = true;

    if (isSuccess) {
        resolve("Первый промис успешно исполнился!");
    } else {
        reject("Первый промис провалился!");
    }
});

myPromise
    .then((result) => {
        console.log("Этап 1: ", result);
        return new Promise((resolve, reject) => {
            const isSecondSuccess = true;

            if (isSecondSuccess) {
                resolve("Второй промис успешно исполнился!");
            } else {
                reject("Второй промис провалился!");
            }
        });
    })
    .then((secondResult) => {
        console.log("Этап 2: ", secondResult);
    })
    .catch((error) => {
        console.error("Ошибка в цепочке: ", error);
    });
function delay(value, ms, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            shouldFail ? reject(new Error(`Ошибка при обработке: ${value}`)) : resolve(value);
        }, ms);
    });
}
async function startHomework() {
    console.log("=== ЗАДАНИЕ 1: Цепочка then/catch/finally ===");
    await delay(1, 500)
        .then(value => {
            console.log(`Шаг 1 успешно: ${value}`);
            return delay(value + 1, 500, true);
        })
        .then(value => {
            console.log(`Шаг 2: ${value} (этот текст мы не должны увидеть)`);
            return delay(value + 1, 500);
        })
        .then(value => {
            console.log(`Шаг 3: ${value} (этот тоже пропустится)`);
        })
        .catch(error => {
            console.error(`Перехвачена ошибка: ${error.message}`);
        })
        .finally(() => {
            console.log("Finally: Задание 1 завершено в любом случае!\n");
        });

    console.log("=== ЗАДАНИЕ 2: async/await ===");
    console.log("--- Часть 2.1: Переписываем Задание 1 ---");
    try {
        const step1 = await delay(1, 500);
        console.log(`Async Шаг 1: ${step1}`);

        const step2 = await delay(step1 + 1, 500, true);
        console.log(`Async Шаг 2: ${step2}`);

        const step3 = await delay(step2 + 1, 500);
    } catch (error) {
        console.error(`Async Ошибка: ${error.message}`);
    } finally {
        console.log("Async Finally!\n");
    }

    console.log("--- Часть 2.2: Массив с try/catch внутри цикла ---");
    const values = [10, 20, 30, 40];
    const results = [];

    for (const val of values) {
        try {
            const isFail = Math.random() > 0.7;
            const res = await delay(val, 500, isFail);

            results.push({ value: res, error: null });
            console.log(`Элемент ${val} обработан успешно.`);
        } catch (error) {
            results.push({ value: val, error: error.message });
            console.error(`Элемент ${val} упал с ошибкой.`);
        }
    }
    console.log("Итоговый массив объектов:", results, "\n");

    console.log("=== ЗАДАНИЕ 3: Promise.all, allSettled, race ===");

    console.log("--- Promise.all ---");
    try {
        const allRes = await Promise.all([
            delay("A", 1000),
            delay("B", 1500, true),
            delay("C", 500),
            delay("D", 2000)
        ]);
        console.log("Promise.all выполнился:", allRes);
    } catch (error) {
        console.error("Promise.all сразу остановился из-за ошибки:", error.message);
    }

    console.log("\n--- Promise.allSettled ---");
    const settledRes = await Promise.allSettled([
        delay("A", 1000),
        delay("B", 1500, true),
        delay("C", 500),
        delay("D", 2000)
    ]);

    const succeeded = settledRes
        .filter(p => p.status === "fulfilled")
        .map(p => p.value);

    const failed = settledRes
        .filter(p => p.status === "rejected")
        .map(p => p.reason.message);

    console.log("Успешные:", succeeded);
    console.log("Упавшие:", failed);

    console.log("\n--- Promise.race ---");
    try {
        const raceRes = await Promise.race([
            delay("Полезный результат", 2000), // Долго
            delay("Таймаут истек", 500, true)
        ]);
        console.log("Победил и вернул:", raceRes);
    } catch (error) {
        console.error("Promise.race выбросил ошибку (победил таймаут):", error.message);
    }
}

startHomework();