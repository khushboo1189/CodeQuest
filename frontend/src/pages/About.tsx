import { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title = 'CoddeQuest | About Us';
  }, []);

  return (
    <div>About</div>
  )
}

export default About