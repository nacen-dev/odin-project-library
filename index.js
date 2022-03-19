const myLibrary = [];

function Book(name, pages, read, author) {
  this.name = name;
  this.pages = pages;
  this.read = read;
  this.author = author;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

let atomicHabits = new Book("Atomic Habits", 306, true, "James Clear");
let atomicHabits2 = new Book("Atomic Habits", 306, true, "James Clear");
let atomicHabits3 = new Book("Atomic Habits", 306, true, "James Clear");

addBookToLibrary(atomicHabits);
addBookToLibrary(atomicHabits2);
addBookToLibrary(atomicHabits3);

const books = document.querySelector(".books-display");
console.log(books);

function createBookElement(book) {
  const { name, pages, read, author } = book;

  const bookElement = document.createElement("div");
  bookElement.className = "book card";

  const bookTitle = document.createElement("h3");
  bookTitle.textContent = name;
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

  return bookElement;
}

function addLibraryToBooksDisplay() {
  myLibrary.forEach((book) => {
    books.appendChild(createBookElement(book));
  });
}

addLibraryToBooksDisplay();
