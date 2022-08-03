import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home11Background">
      <div className="home11Main">
        <Link to="/root">
          <img id="home11Finder" src="/finder.png" alt="finder" />
        </Link>
        <div id="home11Dot"></div>
      </div>
    </div>
  );
}

export default Home;
