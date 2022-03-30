import { uuidv4 } from "./helper.js";

let library = [];

function Book(title, pages, author, id) {
  this.title = title;
  this.pages = pages;
  this.author = author;
  this.id = id;
}

Book.prototype.read = false;

function addBookToLibrary(book) {
  library.push(book);
}

const books = document.querySelector(".books-display");

function deleteBookFromLibrary(id) {
  library = library.filter((book) => book.id !== id);
}

function deleteBookFromBooksDisplay(id) {
  const bookToDelete = document.querySelector(`div[data-id="${id}"]`);
  books.removeChild(bookToDelete);
}

function createBookElement(book) {
  const { title, pages, author, id } = book;

  const bookElement = document.createElement("div");
  bookElement.className = "book card";

  bookElement.dataset.id = id;

  const bookTitle = document.createElement("h3");
  bookTitle.textContent = title;
  bookTitle.className = "book-title";
  bookElement.appendChild(bookTitle);

  const bookPages = document.createElement("p");
  bookPages.textContent = `Pages: ${pages}`;
  bookPages.className = "book-pages";
  bookElement.appendChild(bookPages);

  const bookAuthor = document.createElement("p");
  bookAuthor.textContent = `Author: ${author}`;
  bookAuthor.className = "book-author";
  bookElement.appendChild(bookAuthor);

  const readContainer = document.createElement("div");
  readContainer.className = "read-container";
  const readElement = document.createElement("p");
  readElement.textContent = "Read: ";
  readElement.className = "book-read";

  const bookReadButton = document.createElement("button");
  bookReadButton.type = "button";
  bookReadButton.className = book.read
    ? "book-read-button"
    : "book-not-read-button";

  readContainer.appendChild(readElement);
  readContainer.appendChild(bookReadButton);
  bookElement.appendChild(readContainer);

  const deleteBook = document.createElement("button");
  deleteBook.type = "button";
  deleteBook.className = "delete-book";

  bookElement.appendChild(deleteBook);

  deleteBook.addEventListener("click", (event) => {
    deleteBookFromBooksDisplay(id);
    deleteBookFromLibrary(id);
  });

  bookReadButton.addEventListener("click", (event) => {
    book.read = !book.read;

    bookReadButton.className = book.read
      ? "book-read-button"
      : "book-not-read-button";
  });

  return bookElement;
}

function addLibraryToBooksDisplay() {
  library.forEach((book) => {
    books.appendChild(createBookElement(book));
  });
}

function addBookToDisplay(book) {
  books.appendChild(book);
}

function toggleFormVisibility() {
  const bookForm = document.querySelector(".book-form");
  bookForm.hidden = !bookForm.hidden;
}

const addNewBookButton = document.querySelector("#add-new-book");
const addBookButton = document.querySelector("#add-book");

addNewBookButton.addEventListener("click", (event) => {
  toggleFormVisibility();
  addNewBookButton.hidden = true;
});

addBookButton.addEventListener("click", (event) => {
  const bookTitle = document.querySelector("#book-title");
  const bookAuthor = document.querySelector("#book-author");
  const bookPages = document.querySelector("#book-pages");
  const bookRead = document.querySelector(`input[name="book-read"]:checked`);

  if (
    bookTitle.validity.valid &&
    bookAuthor.validity.valid &&
    bookPages.validity.valid
  ) {
    const newBook = new Book(
      bookTitle.value,
      bookPages.value,
      bookAuthor.value,
      uuidv4()
    );

    if (bookRead) {
      newBook.read = true;
    }

    const newBookElement = createBookElement(newBook);

    addBookToLibrary(newBook);
    addBookToDisplay(newBookElement);
    addNewBookButton.hidden = false;
    toggleFormVisibility();
    resetBookFormValues(bookTitle, bookAuthor, bookPages, bookRead);
  } else {
    alert("invalid data entered");
  }
});

function resetBookFormValues(bookTitle, bookAuthor, bookPages, bookRead) {
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  bookRead.checked = false;
}

addLibraryToBooksDisplay();
toggleFormVisibility();
toggleFormVisibility();
