import { useEffect } from "react";

function Authentication() {
  useEffect(() => {
    document.title = 'CodeQuest | Authentication';
  }, []);

  return (
    <div>Authentication</div>
  )
}

export default Authentication;