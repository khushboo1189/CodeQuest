import { useEffect } from "react";

function Authentication() {
  useEffect(() => {
    document.title = 'CoddeQuest | Authentication';
  }, []);

  return (
    <div>Authentication</div>
  )
}

export default Authentication;