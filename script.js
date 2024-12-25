const linksTextarea = document.getElementById('links');
const resultDiv = document.getElementById('result');
const container = document.querySelector('.container');

function updateResult() {
    const text = linksTextarea.value;
    const links = text.match(/https:\/\/\S+/g) || [];
    const linksCount = links.length;

    let highlightClass = '';
    if (linksCount < 20) {
        highlightClass = 'negative';
    } else if (linksCount >= 20 && linksCount < 30) {
        highlightClass = 'low';
    } else {
        highlightClass = 'positive';
    }

    resultDiv.innerHTML = `<span class="result-text">Количество ссылок: </span><span class="highlight ${highlightClass}"><span class="count">${linksCount}</span></span>`;
}

linksTextarea.addEventListener('input', updateResult);

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