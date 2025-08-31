import React, {useState}from "react";
import { useNavigate } from "react-router-dom";
import type {userSignUpType} from "../types/user_types"

const SignUpPage: React.FC = () => {
  const nav = useNavigate();
  const [signUpFields, setSignUpFields] = useState<userSignUpType>({
    "userName" : "",
    "email" : "",
    "password": ""
  })
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  const loginHandler = () => {
    console.log(signUpFields)
  }
  

  return (
    <>
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center w-full border border-warning w-full w-md-25">
        <div className="card col-12 col-md-6 justify-content-center">
            <img  src="../../public/Logo.svg" className="card-img-top w-25 mx-auto"></img>
          <div className="card-body">
            <h5 className="card-title">Sign Up</h5>
            <div className="row gap-2">
              <input type="text" className="form-control" placeholder="Username" onChange={(e)=>{setSignUpFields({...signUpFields, userName: e.target.value})}}/>
              <input type="text" className="form-control" placeholder="email" onChange={(e)=>{setSignUpFields({...signUpFields, email: e.target.value})}}/>
              <input type="text" className="form-control" placeholder="password" onChange={(e)=>{setSignUpFields({...signUpFields, password: e.target.value})}} />
              <input type="text" className="form-control" placeholder="confirm password" onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
            </div>
            <button type="button" className="btn btn-warning border border-primary my-2"
              onClick={loginHandler}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
