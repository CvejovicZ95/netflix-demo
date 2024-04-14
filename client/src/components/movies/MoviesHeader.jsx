import { useState } from "react";
import {Logo} from "../Logo/Logo"
import { Link } from "react-router-dom";
import {Logout} from "../LogoutButton/LogoutButton"
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import "./MoviesHeader.css";

const MoviesHeader = ({ setSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  
    if (value === "") {
      setSearch("");
    } else {
      if (value.length < 1) {
        return toast.error("Search term must be at least 1 characters long");
      }
      setSearch(value);
    }
  }

  return (
    <div className="moviesHeader">
      <Logo />
      <form className="search-form" onChange={handleSearch}>
        <input
          type="text"
          placeholder="Search by category or movie title..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
          <FaSearch
            className="fa-search"
            style={{ color: "red", fontSize: "26px" }}
          />
      </form>
      <div>
        <Link to="/upload">
          <button className="upload-button">Upload Movie</button>
        </Link>
        <Logout />
      </div>
    </div>
  );
};

export {MoviesHeader};
