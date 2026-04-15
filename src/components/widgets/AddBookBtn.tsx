import { Link } from "react-router";

function AddBookBtn() {
  return (
    <Link to={"/book/add"} className="btn">
      Add New Book
    </Link>
  );
}

export default AddBookBtn;
