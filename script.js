const linksTextarea = document.getElementById('links');
const resultDiv = document.getElementById('result');
const duplicatesDiv = document.getElementById('duplicates');
const duplicatesToggle = document.getElementById('duplicates-toggle');
const container = document.querySelector('.container');

function updateResult() {
    const text = linksTextarea.value;
    const links = text.match(/https:\/\/\S+/g) || [];
    const linksCount = links.length;

    let duplicateLinksCount = 0;
    let duplicatesContent = '';

    if (duplicatesToggle.checked) {
        const { duplicates, duplicatesCount: totalDuplicates } = findDuplicates(links);
        duplicateLinksCount = totalDuplicates;

        if (duplicates.length > 0) {
            duplicatesContent = '<div class="duplicates-title">Повторные ссылки:</div>';
            let counter = 1;
            for (const group of duplicates) {
              duplicatesContent += `<div style="margin-top: 10px; text-align: center;">${getEmojiNumber(counter)}</div>`; // Center-align emoji number
              duplicatesContent += `<div style="text-align: center;">`; // Create a div to center the links
              for (const link of group) {
                duplicatesContent += `${link}<br>`;
              }
              duplicatesContent += `</div>`; // Close the centering div
              counter++;
            }
            duplicatesDiv.innerHTML = duplicatesContent;
            duplicatesDiv.classList.add('show');
        } else {
            duplicatesDiv.innerHTML = '';
            duplicatesDiv.classList.remove('show');
        }
    } else {
        duplicatesDiv.innerHTML = '';
        duplicatesDiv.classList.remove('show');
    }

    let highlightClass = '';
    if (linksCount < 20) {
        highlightClass = 'negative';
    } else if (linksCount >= 20 && linksCount < 30) {
        highlightClass = 'low';
    } else {
        highlightClass = 'positive';
    }

    if (duplicatesToggle.checked) {
        resultDiv.innerHTML = `<span class="result-text">Количество ссылок: </span><span class="highlight ${highlightClass}"><span class="count">${linksCount}</span></span><br>`;
        resultDiv.innerHTML += `<span class="result-text">Повторные ссылки: </span><span class="highlight duplicate"><span class="count">${duplicateLinksCount}</span></span>`;
    } else {
        resultDiv.innerHTML = `<span class="result-text">Количество ссылок: </span><span class="highlight ${highlightClass}"><span class="count">${linksCount}</span></span>`;
    }
}

function findDuplicates(arr) {
    const seen = new Map();
    const duplicates = [];
    let duplicatesCount = 0;
    for (const item of arr) {
        if (seen.has(item)) {
            seen.get(item).push(item);
        } else {
            seen.set(item, [item]);
        }
    }

    for (const [link, linksArr] of seen) {
        if (linksArr.length > 1) {
            duplicates.push(linksArr);
            duplicatesCount += linksArr.length;
        }
    }

    return { duplicates, duplicatesCount };
}

function getEmojiNumber(number) {
    const emojiNumbers = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
    if (number < 10) {
        return emojiNumbers[number];
    } else {
        let emojiString = '';
        const numberString = number.toString();
        for (const digit of numberString) {
            emojiString += emojiNumbers[parseInt(digit)];
        }
        return emojiString;
    }
}

linksTextarea.addEventListener('input', updateResult);
duplicatesToggle.addEventListener('change', updateResult);

const wrapper = document.querySelector('.wrapper');

wrapper.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = mouseY / 20;
    const rotateY = mouseX / 20;

    container.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
});

wrapper.addEventListener('mouseleave', () => {
    container.style.transform = 'rotateX(0) rotateY(0)';
});

updateResult();