import { useEffect } from "react";
import "../styles/Home.css";

function Home() {
  useEffect(() => {
    document.title = 'CoddeQuest | Home';
  }, []);

  return (
    <div className="w-full h-auto">
      <div className="content mt-[80px] text-center">
        <h1 className="text-5xl">Welcome to</h1>
        <h1 className="text-8xl">CoddeQuest</h1>
        <h5 className="mt-[40px] text-2xl">The best place to learn coding</h5>
      </div>
    </div>
  )
}

export default Home;