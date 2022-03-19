const myLibrary = [];

function Book(name, id, pages, read, author) {
  this.name = name;
  this.id = id;
  this.pages = pages;
  this.read = read;
  this.author = author;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}