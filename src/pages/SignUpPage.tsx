import React, {useState}from "react";
import { useNavigate } from "react-router-dom";
import {validateSubmissionFields} from "../validators/user_validations"
import type {userSignUpFieldsType, userSignUpErrorType} from "../types/user_types"

const SignUpPage: React.FC = () => {
  const nav = useNavigate();
  const [signUpFields, setSignUpFields] = useState<userSignUpFieldsType>({
    "userName" : "",
    "email" : "",
    "password": "",
    "confirmPassword" : ""
  })
  // border color changes for errors
  const [signUpErrorFields, setSignUpErrorFields] = useState<userSignUpErrorType>({
    "userName" : "",
    "email" : "",
    "password": "",
    "confirmPassword" : "",
    "otherError" : ""
  })

  const submissionHandler = () => {
    // perform field validations - will set errors
    const errorResult:boolean = validateSubmissionFields(signUpFields, setSignUpErrorFields)
  }
  

  return (
    <>
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center w-full border border-5 rounded-4 border-warning w-full w-md-25">
        <div className="card col-10 col-md-4 col-lg-3 col-2 justify-content-center border border-4 border-warning">
            <img  src="../../public/Logo.svg" className="card-img-top w-25 mx-auto"></img>
          <form className="card-body">
            <h5 className="card-title">Sign Up</h5>
            <div className="row gap-2">

              {/* --------- Username ---------*/}
              {/* Username Error */}
              {signUpErrorFields.userName !== "" && <div className="text-danger">{signUpErrorFields.userName}</div>}
              {/* Username input */}
              <input type="text" 
                className={`form-control border-${signUpErrorFields.userName === "" ? "1" : "2"} 
                    border-${signUpErrorFields.userName === "" ? "dark" : "danger"} focus-ring focus-ring-dark`}
                placeholder="Username" 
                onChange={(e)=>{setSignUpFields({...signUpFields, userName: e.target.value})}}/>
                

              {/* --------- Email --------- */}
              {/* Email Error */}
              {signUpErrorFields.email !== "" && <div className="text-danger">{signUpErrorFields.email}</div>}
              {/* Email input */}
              <input type="email" 
                className={`form-control border-${signUpErrorFields.email === "" ? "1" : "2"} 
                    border-${signUpErrorFields.email === "" ? "dark" : "danger"} focus-ring focus-ring-dark`}
              placeholder="email" 
              onChange={(e)=>{setSignUpFields({...signUpFields, email: e.target.value})}}/>

              {/* --------- Password ---------*/}
              {/* Password Error */}
              {signUpErrorFields.password !== "" && <div className="text-danger">{signUpErrorFields.password}</div>}
              {/* Password input */}
              <input type="password"
                className={`form-control border-${signUpErrorFields.password === "" ? "1" : "2"} 
                    border-${signUpErrorFields.password === "" ? "dark" : "danger"} focus-ring focus-ring-dark`}
               placeholder="password" onChange={(e)=>{setSignUpFields({...signUpFields, password: e.target.value})}} />

               {/* --------- Confirm Password --------- */}
              {/* ConfirmPassword Error */}
              {signUpErrorFields.confirmPassword !== "" && <div className="text-danger">{signUpErrorFields.confirmPassword}</div>}
              {/* Confirm Password input */}
              <input type="password"                 
                className={`form-control border-${signUpErrorFields.confirmPassword === "" ? "1" : "2"} 
                    border-${signUpErrorFields.confirmPassword === "" ? "dark" : "danger"} focus-ring focus-ring-dark`}
              placeholder="confirm password" onChange={(e)=>{setSignUpFields({...signUpFields, confirmPassword: e.target.value})}}/>
            </div>
            {/* Submit */}
            <button type="button" className="btn btn-warning border border-dark rounded-3 mt-2"
              onClick={submissionHandler}
            >
              Submit
            </button>
              {/* Password mismatch error */}
              {signUpErrorFields.otherError !== "" && <div className="text-danger">{signUpErrorFields.otherError}</div>}
            {/* Error Display */}
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
