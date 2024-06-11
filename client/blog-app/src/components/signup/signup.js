import { useState } from "react";
import { useForm } from "react-hook-form";
import "./signup.css"
import axios from 'axios';
import { useNavigate,Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

function SignUp(){

    let {register,handleSubmit,formState:{errors}}=useForm();
   let [err,setErr]=useState('');
    let navigate=useNavigate()
   const onSighInFormSubmit=async (userObj)=>{
   
    userObj.status=true;
    let endpoint;
    // const endpoint = userObj.userType === "user" ? 'http://localhost:4000/user-api/user' : 'http://localhost:4000/author-api/register';
    if(userObj.userType==="user"){
        endpoint= 'http://localhost:4000/user-api/user';
    }else if(userObj.userType==="admin"){
        endpoint='http://localhost:4000/admin-api/admin';
    }else{
        endpoint='http://localhost:4000/author-api/register';
    }
    let res = await axios.post(endpoint, userObj);
    console.log(res);
       if(res.data.message==="User Created"){
            //if yes navigate
            alert('User created')
            navigate('/signin')
       }else{
            setErr(res.data.message)
       }
    }
    console.log(err)
    return (
        <div class="container p-auto">
            <div class=" row justify-content-center mt-4">
                <div class="col-lg-9 col-md-9 col-sm-8">
                    <div class="card-shadow">
                        <div class="card-title text-center border-bottom">
                            <h2 class="p-3">SignUp</h2>
                        </div>
                        <div class="card-body  bg-light">
                            {/* display user sign up message */}
                            {err.length!==0&&<p class="p-3 text-danger">{err}</p>}
                            <form onSubmit={handleSubmit(onSighInFormSubmit)} >
                                <div class="mb-4">
                                    <label htmlFor="User" class="form-check-lable me-3" style={{fontSize:"1.2 rem", color:"var(--light-dark-grey"}}>
                                        Register as
                                     </label>
                                     <div class="form-check form-check-inline">
                                        <input type="radio" class="form-check-input" id="admin" value="admin"{...register("userType")}></input>
                                        <label htmlFor="admin" class="form-check-inline">admin</label>
                                     </div>
                                     <div class="form-check form-check-inline">
                                        <input type="radio" class="form-check-input" id="author" value="author"{...register("userType")}></input>
                                        <lable htmlFor="author" class="form-check-lable">
                                            Author
                                        </lable>
                                     </div>
                                     <div class="form-check form-check-inline">
                                        <input type="radio" class="form-check-input" id="user" value="user"{...register("userType")}></input>
                                        <label htmlFor="user" class="form-check-inline">User</label>
                                     </div>
                                </div>
                                <div class="mb-4">
                                    <lable htmlFor="User" class="form-label" >UserName</lable>
                                    <input type="text" class="form-control" required minLength={4} id="userName"{...register("userName")}></input>

                                </div>
                                <div class="mb-4">
                                    <lable htmlFor="password" class="form-label">password</lable>
                                    <input type="password" required minLength={8} class="form-control" id="password"{...register("password")}></input>

                                </div>
                                <div class="mb-4">
                                    <lable htmlFor="email" class="form-label">email</lable>
                                    <input type="email" class="form-control" id="email"{...register("email")}></input>

                                </div>
                                <div class="text-center">
                                    <button type="submit" class="text-light bg-info rounded" > Register</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
}

export default SignUp;
