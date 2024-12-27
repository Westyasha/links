const linksTextarea = document.getElementById('links');
const resultDiv = document.getElementById('result');
const duplicatesDiv = document.getElementById('duplicates');
const duplicatesToggle = document.getElementById('duplicates-toggle');
const container = document.querySelector('.container');

function updateResult() {
    const text = linksTextarea.value;
    const links = text.match(/https:\/\/\S+/g) || [];
    const linksCount = links.length;

    let uniqueLinksCount = linksCount;
    let duplicateLinksCount = 0;

    if (duplicatesToggle.checked) {
        const duplicates = findDuplicates(links);
        duplicateLinksCount = duplicates.length;
        uniqueLinksCount = linksCount - duplicateLinksCount;

        if (duplicates.length > 0) {
            duplicatesDiv.innerHTML = 'Повторные ссылки:<br>' + duplicates.join('<br>');
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
    if (uniqueLinksCount < 20) {
        highlightClass = 'negative';
    } else if (uniqueLinksCount >= 20 && uniqueLinksCount < 30) {
        highlightClass = 'low';
    } else {
        highlightClass = 'positive';
    }

    resultDiv.innerHTML = `<span class="result-text">Количество ссылок: </span><span class="highlight ${highlightClass}"><span class="count">${uniqueLinksCount}</span></span>`;

    if (duplicatesToggle.checked) {
        resultDiv.innerHTML += ` | <span class="highlight duplicate"><span class="count">${duplicateLinksCount}</span></span>`;
    }
}

function findDuplicates(arr) {
    const seen = new Set();
    const duplicates = new Set();
    for (const item of arr) {
        if (seen.has(item)) {
            duplicates.add(item);
        } else {
            seen.add(item);
        }
    }
    return Array.from(duplicates);
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