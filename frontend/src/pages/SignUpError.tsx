import { Link } from "react-router-dom"

function SignUpError() {
  return (
    <div className="found flex flex-col items-center justify-center my-40">
        <h1 className="text-[48px] font-bold opacity-50">You can't access that!</h1>
        <p className="text-[28px] opacity-25 py-4">You need to Sign Up or Register First!</p>
        <Link to="/authentication">Register</Link>
    </div>
  )
}

export default SignUpError