import { useEffect } from "react"
import "../styles/Home.css"

function NotFound() {
    useEffect(() => {
        document.title = "404 - Not Found!"
    }, [])

  return (
    <div className="h-[calc(100vh-130px)] w-full flex justify-center items-center flex-col font-['Oswald']">
        <h1 className="text-center text-red-500 text-3xl">404 - Not Found!</h1>

        <p className="text-center text-red-500 text-2xl">Sorry, the page you are looking for does not exist.</p>
    </div>
  )
}

export default NotFound