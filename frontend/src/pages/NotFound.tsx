import { Link } from "react-router-dom";
import Not_found from "../components/Not_Found";
import "../styles/Home.css"

function NotFound() {
  return (
    <div className="found flex flex-col items-center justify-center my-40">
        <Not_found />
        <h1 className="text-[48px] font-bold opacity-50">Oops! You're lost.</h1>
        <p className="text-[28px] opacity-25 py-4">We can't find the page you are looking for!</p>
        <Link to="/">Back to Home</Link>
    </div>
  );
}

export default NotFound;