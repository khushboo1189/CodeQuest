import { useEffect } from "react";
import "../../styles/Home.css";
import Section_1 from "./Section_1";

function Home() {
  useEffect(() => {
    document.title = 'CoddeQuest';
  }, []);

  return (
    <div className="home-page min-h-screen max-w-screen">
      <Section_1 />
    </div>
  )
}

export default Home;