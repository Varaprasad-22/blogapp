import './signin.css';
import {useForm} from 'react-hook-form';
//import '~bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import {useDispatch,useSelector}from 'react-redux';
import { Container,Row,Col, useAccordionButton } from 'react-bootstrap';
import {userAuthorloginThunk} from '../../redux/slices/userAuthorslice'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function SignIn(){
    let {register,handleSubmit,formState:{errors}}=useForm();
    let dispatch=useDispatch();
    let { isPending,loginUserStatus,errMsg,errorOccured,currentUser}=useSelector(state=>state.userAuthoruserAuthorLoginReducer)
    let navigate=useNavigate();

    function onSighInFormSubmit(usercred){
        console.log(usercred)
        dispatch(userAuthorloginThunk(usercred))
    }

 
    //for navigate to user profile
    useEffect(()=>{
        if(loginUserStatus===true){
            if(currentUser.userType==="user")
            {
                navigate('/user-profile')
            }else if(currentUser.userType==="admin"){
                navigate('/admin-profile')
            }
            else
            {
                navigate('/author-profile')
            }
        }
    },[loginUserStatus])


    return(
    <div className="container ">
        <div className="row justify-content-center m-auto p-auto mt-4">
            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 col-xl-9">
                {/* <div className="card"> */}
                <div className='card-title text-center border-bottom'>
                    <h2 className='p-3'>SignIn</h2>
                </div>
                <div className='card-body bg-light'>
                    {errorOccured===true&&(<p className='text-center'>{errMsg}</p>)}
                    <form onSubmit={handleSubmit(onSighInFormSubmit)}>
                    <div className='mb-4'>
                        <label htmlFor="user" className='form-check-lable me-3' style={{ fontSize: "1.2rem", color: "var(--light-dark-grey)", }}>
                        Login as
                        </label>
                        <div className='form-check form-check-inline'>
                            <input type='radio' className='form-check-input' id='author' value='author' {...register("userType")}></input>
                        
                        <label htmlFor='author' className='form-check-labe '>Author</label>
                        </div>
                         <div className='form-check form-check-inline'>
                        <input type='radio' className='form-check-input' id='user' value='user' {...register('userType')}></input>                    
                        <lable htmlFor="user" className='from-check-labe'>User</lable>
                        </div>
                        <div className='form-check form-check-inline'>
                        <input type='radio' className='form-check-input' id='admin' value='admin' {...register('userType')}></input>                    
                        <lable htmlFor="admin" className='from-check-labe'>admin</lable>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <lable htmlFor="userName" className="from-label">UserName</lable>
                        <input type='text' className='form-control'required minLength={4} id="userName"{...register("userName")}></input>
                    
                    </div>
                    <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"  className="form-control" required  id="password"{...register("password")} />
                </div>

                <div className="text-center">
                  <button type="submit" className=" text-light bg-info rounded">
                    Login
                  </button>
                </div>
                    </form>
                </div>
                {/* </div> */}
            </div>

        </div>
    </div>)
}



export default SignIn;
