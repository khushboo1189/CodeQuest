import { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title = 'CodeQuest | About Us';
  }, []);

  return (
    <div>About</div>
  )
}

export default About