import type { Book } from "../types/Book";

function EditBookDetail({ book }: { book: Book }) {
  return (
    <div>
      <input value={book.title} />
      <input value={book.author} />
    </div>

    /*
    Can you create an EditBookDetail component based off of BookDetail that uses the same layout but turns all of the dd elements into inputs and the dt elements into labels?
    It will bring the current book into a private state and validatae the form fields with a reducer and form state that includes an editing, saving, success, and error state.
    There should be custom error messages for each field based off some basic validation.
    */
  );
}

export default EditBookDetail;
