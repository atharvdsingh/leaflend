import type { SerializableBook } from "@/app/types/bookstypeforRedux";

export class ManageLocalStorage {
  private static instance: ManageLocalStorage;
  private constructor() {}
  static ReturnInstance() {
    if (!ManageLocalStorage.instance) {
      ManageLocalStorage.instance = new ManageLocalStorage();
    }
    return ManageLocalStorage.instance;
  }
  private getBooks():SerializableBook[] {
    try {
      const raw = localStorage.getItem("books");
      if (!raw) {
        return [];
      }
      return JSON.parse(raw);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  addedToTheStorage(data: SerializableBook) {
    const books: SerializableBook[] = this.getBooks();
    books.push(data);
    localStorage.setItem("books", JSON.stringify(books));
  }
  removeBook(data: SerializableBook) {
    const books: SerializableBook[] = this.getBooks();
    localStorage.setItem(
      "books",
      JSON.stringify(books.filter((book) => book.id != data.id))
    );
  }
}
