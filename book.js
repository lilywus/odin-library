const myLibrary = [];
const libraryContainer = document.querySelector("#container");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read;
}

function displayBooks() {
    libraryContainer.innerHTML = "";

    for (let book of myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("card");

        const bookInfo = document.createElement("ul");

        const title = document.createElement("li");
        title.innerHTML = (book.title);
        bookInfo.appendChild(title);

        const author = document.createElement("li");
        author.innerHTML = ("<b>Author:</b> " + book.author);
        bookInfo.appendChild(author);

        const pages = document.createElement("li");
        pages.innerHTML = ("<b>Pages:</b> " + book.pages);
        bookInfo.appendChild(pages);

        const read = document.createElement("li");
        let readText;
        if (book.read == true) readText = "Yes";
        else readText = "No";
        read.innerHTML = ("<b>Read:</b> " + readText);
        bookInfo.appendChild(read);

        bookCard.appendChild(bookInfo);
        libraryContainer.appendChild(bookCard);
    }}

function addBook(book) {
    myLibrary.push(book);
}

let book1 = new Book("The Bad Beginning", "Lemony Snicket", 162, true);
let book2 = new Book("The Reptile Room", "Lemony Snicket", 190, true);
let book3 = new Book("The Wide Window", "Lemony Snicket", 214, false);

// set up homepage with 3 initial books
addBook(book1);
addBook(book2);
addBook(book3);
displayBooks();

const addButton = document.querySelector("#addButton");
const dialog = document.querySelector("#dialog");
const submitButton = document.querySelector("#submitButton");
const closeButton = document.querySelector("#closeButton");

const titleField = document.querySelector("#title");
const authorField = document.querySelector("#author");
const pageField = document.querySelector("#pages");
const readField = document.querySelector("#read");

addButton.addEventListener("click", () => {
    dialog.showModal();
});

submitButton.addEventListener("click", () => {
    let pageInput = Number(pageField.value);
    if (pageInput <= 0 || !Number.isInteger(pageInput)) {
        pageField.setCustomValidity("Please enter a valid page count.");
    }
    else {
        pageField.setCustomValidity("");

        let titleInput = titleField.value;
        let authorInput = authorField.value;
        if (titleInput && authorInput) {
            let newBook = new Book(titleInput, authorInput, pageInput, readField.checked);
            addBook(newBook);
            displayBooks();
        }
    }
});

closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});
