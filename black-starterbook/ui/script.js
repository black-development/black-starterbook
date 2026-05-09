let pages = [];
let currentPageIndex = 0;
let isEditMode = false;

const wrapper = document.getElementById('book-wrapper');
const contentLeft = document.getElementById('content-left');
const contentRight = document.getElementById('content-right');
const pageNumLeft = document.getElementById('page-num-left');
const pageNumRight = document.getElementById('page-num-right');

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const saveTab = document.getElementById('save-tab');
const addTab = document.getElementById('add-tab');
const delTab = document.getElementById('del-tab');
const closeTab = document.getElementById('close-tab');

window.addEventListener('message', (event) => {
    const data = event.data;
    if (data.type === 'OPEN_BOOK') {
        pages = data.content;
        isEditMode = data.isEdit;
        currentPageIndex = 0;
        
        wrapper.className = data.theme || 'theme-vintage';
        wrapper.style.display = 'block';
        updatePages();

        if (isEditMode) {
            saveTab.style.display = 'flex';
            addTab.style.display = 'flex';
            delTab.style.display = 'flex';
            contentLeft.contentEditable = "true";
            contentRight.contentEditable = "true";
        } else {
            saveTab.style.display = 'none';
            addTab.style.display = 'none';
            delTab.style.display = 'none';
            contentLeft.contentEditable = "false";
            contentRight.contentEditable = "false";
        }
    }
});

function updatePages() {
    const navBtns = document.querySelector('.nav-btns');
    if (pages.length <= 2) {
        navBtns.style.display = 'none';
    } else {
        navBtns.style.display = 'flex';
    }


    if (pages[currentPageIndex]) {
        contentLeft.innerHTML = pages[currentPageIndex].text || "<p>Type here...</p>";
        pageNumLeft.innerText = currentPageIndex + 1;
        contentLeft.contentEditable = isEditMode ? "true" : "false";
    } else {
        contentLeft.innerHTML = "";
        pageNumLeft.innerText = "-";
        contentLeft.contentEditable = "false";
    }


    if (pages[currentPageIndex + 1]) {
        contentRight.innerHTML = pages[currentPageIndex + 1].text || "<p>Type here...</p>";
        pageNumRight.innerText = currentPageIndex + 2;
        contentRight.contentEditable = isEditMode ? "true" : "false";
    } else {
        contentRight.innerHTML = "";
        pageNumRight.innerText = "-";
        contentRight.contentEditable = "false";
    }
}

prevBtn.addEventListener('click', () => {
    if (currentPageIndex > 0) {
        saveCurrentPages();
        currentPageIndex -= 2;
        updatePages();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPageIndex + 2 < pages.length) {
        saveCurrentPages();
        currentPageIndex += 2;
        updatePages();
    }
});

function saveCurrentPages() {
    if (isEditMode) {
        if (pages[currentPageIndex]) pages[currentPageIndex].text = contentLeft.innerHTML;
        if (pages[currentPageIndex + 1]) pages[currentPageIndex + 1].text = contentRight.innerHTML;
    }
}

addTab.addEventListener('click', () => {
    saveCurrentPages();
    pages.push({ title: "NEW PAGE", text: "<h1>New Page</h1><p>Edit me...</p>" });
    currentPageIndex = Math.floor((pages.length - 1) / 2) * 2;
    updatePages();
});

delTab.addEventListener('click', () => {
    if (pages.length > 1) {
        pages.splice(currentPageIndex, 1);
        if (currentPageIndex >= pages.length) currentPageIndex = Math.max(0, pages.length - 2);
        updatePages();
    }
});

saveTab.addEventListener('click', () => {
    saveCurrentPages();
    
    if (!pages || pages.length === 0) return;

    fetch(`https://${GetParentResourceName()}/saveContent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ content: pages })
    }).then(resp => resp.json()).then(resp => {
        if (resp === 'ok') {
            wrapper.style.display = 'none';

        }
    });
});

closeTab.addEventListener('click', () => {
    wrapper.style.display = 'none';
    fetch(`https://${GetParentResourceName()}/close`, {
        method: 'POST',
        body: JSON.stringify({})
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeTab.click();
});
