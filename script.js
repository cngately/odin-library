const library = localStorage.getItem('library') ? JSON.parse(localStorage.getItem('library')) : [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addToLibrary(book) {
    library.push(book);
    display(book);
    localStorage.setItem('library', JSON.stringify(library));
}

function display(book) {
    const div = make('div',['book','background-primary','color-primary']);
    div.appendChild(make('div', [], book.title));
    div.appendChild(make('div', [], `by ${book.author}`));
    div.appendChild(make('div', [], `pages: ${book.pages}`))

    const form = make('form');

    const input = make('input');
    input.type = 'checkbox';
    input.name = 'read';
    input.checked = book.read;
    form.appendChild(input);

    const label = make('label', [], ' Read');
    label.htmlFor = 'read';
    form.appendChild(label);

    div.appendChild(form);

    const btn = make('button', ['remove-book'], 'remove');
    btn.addEventListener('click', () => {
        const books = document.querySelectorAll('.book');
        for (let i = 0; i < books.length; i++) {
            if (books[i] === div) library.splice(i, 1);
        }
        div.remove();
        localStorage.setItem('library', JSON.stringify(library));
    })
    div.appendChild(btn)

    document.body.appendChild(div);
}

function submitBook() {
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const pages = document.getElementById("pages");
    const read = document.getElementById("read");

    if (!title.value || !author.value || !pages.value) {
        alert('please fill out each from');
        return;
    }

    addToLibrary(new Book(title.value, author.value, pages.value, read.checked));

    document.getElementById('book-form').style.display = 'none';
    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
}

function make(element, classes, text) {
    const el = document.createElement(element);
    if (classes) {
        for (const name of classes) {
            el.classList.add(name);
        }
    }
    if (text) el.innerText = text;
    return el;
}

document.getElementById('add-book').addEventListener('click', () => {
    document.getElementById('book-form').style.display = 'flex';
});

function loadLibrary() {
    if (!library) return;
    for (const book of library) {
        display(book);
    }
}