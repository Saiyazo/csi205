import { useRef } from "react";
import { verifyUser } from "../data/users";

const Login = ({setToken, setRole}) => {

  const userRef = useRef()
  const passRef = useRef()

  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center bg-dark">
      <div className="bg-white w-25 h-50 rounded-4 d-flex flex-column justify-content-evenly align-items-center px-4">
        <h2 className="text-primary text-center">Login</h2>
        <form className="w-100 d-flex flex-column justify-content-between align-items-center text-primary fs-5">
          <label className="w-100 text-start ps-3">Username <br /> (user)</label>
          <input className="w-100 p-2 border-0 bg-light rounded-2" type="text" ref={userRef} />
          <label className="w-100 text-start ps-3">Password <br /> (user)</label>
          <input className="w-100 p-2 border-0 bg-light rounded-2" type="password" ref={passRef} />
        </form>
        <button className="w-50 btn btn-primary px-3 py-2 fs-4" onClick={() => {
          const user = userRef.current.value.trim()
          const pass = passRef.current.value.trim()
          const userInfo = verifyUser(user, pass)

          userRef.current.value = ''
          passRef.current.value = ''
          
          if (userInfo === null) {
            alert('Wrong username or password')
            userRef.current.focus()
          } else {
            setToken(userInfo.token)  
            setRole(userInfo.role)
          }
          
        }}>Login</button>
      </div>
    </div>
  );
};

export default Login;