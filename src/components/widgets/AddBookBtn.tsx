import "./AddBookBtn.css";
import { Link } from "react-router";

function AddBookBtn() {
  return (
    <Link to={"/book/add"} className="add-book-btn">
      Add New Book
    </Link>
  );
}

export default AddBookBtn;
