import { uuidv4 } from "./helper.js";

let library = [];

function Book(title, pages, read, author, id) {
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.author = author;
  this.id = id;
}

function addBookToLibrary(book) {
  library.push(book);
}

let atomicHabits = new Book(
  "Atomic Habits",
  306,
  true,
  "James Clear",
  uuidv4()
);
let atomicHabits2 = new Book(
  "Atomic Habits",
  306,
  true,
  "James Clear",
  uuidv4()
);
let atomicHabits3 = new Book(
  "Atomic Habits",
  306,
  true,
  "James Clear",
  uuidv4()
);
let atomicHabits4 = new Book(
  "Atomic Habits",
  306,
  true,
  "James Clear",
  uuidv4()
);

addBookToLibrary(atomicHabits);
addBookToLibrary(atomicHabits2);
addBookToLibrary(atomicHabits3);
addBookToLibrary(atomicHabits4);

const books = document.querySelector(".books-display");

function deleteBookFromLibrary(id) {
  library = library.filter((book) => book.id !== id);
}

function deleteBookFromBooksDisplay(id) {
  const bookToDelete = document.querySelector(`div[data-id="${id}"]`);
  books.removeChild(bookToDelete);
}

function createBookElement(book) {
  const { title, pages, read, author, id } = book;

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

  const readElement = document.createElement("p");
  readElement.textContent = `Read: ${read ? "Have read" : "Not read yet"}`;
  readElement.className = "book-read";
  bookElement.appendChild(readElement);

  const bookAuthor = document.createElement("p");
  bookAuthor.textContent = `Author: ${author}`;
  bookAuthor.className = "book-author";
  bookElement.appendChild(bookAuthor);

  const deleteBook = document.createElement("button");
  deleteBook.className = "delete-book";
  bookElement.appendChild(deleteBook);

  deleteBook.addEventListener("click", (event) => {
    deleteBookFromBooksDisplay(id);
    deleteBookFromLibrary(id);
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
    bookPages.validity.valid &&
    bookRead.validity.valid
  ) {
    const newBook = new Book(
      bookTitle.value,
      bookPages.value,
      bookRead.value,
      bookAuthor.value,
      uuidv4()
    );

    const newBookElement = createBookElement(newBook);

    addBookToLibrary(newBook);
    addBookToDisplay(newBookElement);
    addNewBookButton.hidden = false;
    toggleFormVisibility();
  }
});

function resetBookFormValues() {
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  bookRead.value = "";
}

addLibraryToBooksDisplay();
toggleFormVisibility();
toggleFormVisibility();
