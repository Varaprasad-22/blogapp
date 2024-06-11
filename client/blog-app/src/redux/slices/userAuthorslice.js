
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
//make http request use redux thunk
export const userAuthorloginThunk= createAsyncThunk("user-author-login",async(userCredObj,thunkApi)=>{
   try{{
    if(userCredObj.userType==='user'){
           const res= await axios.post('http://localhost:4000/user-api/login',userCredObj)
           if(res.data.message==='login success'){
                //storing in local or session storage
                localStorage.setItem('token',res.data.token)

                //return data
                
           }else{
                return thunkApi.rejectWithValue(res.data.message)
           }
           return res.data;
        }
        if(userCredObj.userType==='author'){
           const res= await axios.post('http://localhost:4000/author-api/login',userCredObj)
           if(res.data.message==="login success"){
           
            localStorage.setItem('token',res.data.token)
           
            }else{
            return thunkApi.rejectWithValue(res.data.message)
             }
             return res.data;
        }
        if(userCredObj.userType==='admin'){
            const res= await axios.post('http://localhost:4000/admin-api/login',userCredObj)
            if(res.data.message==="login success"){
            
             localStorage.setItem('token',res.data.token)
            
             }else{
             return thunkApi.rejectWithValue(res.data.message)
              }
              return res.data;
         }}}catch(err){
             return thunkApi.rejectWithValue(err)
         }
})

export const userAuthorslice=createSlice({
    name:"user-author-slicer",
    initialState:{
        isPending:false,
        loginUserStatus:false,
        currentUser:{},
        errorOccured:false,
        errMsg:''
    },
    reducers:{
        resetState:(state,action)=>{
            state.isPending=false;
            state.currentUser={};
            state.loginUserStatus=false;
            state.errorOccured=false;
            state.errMsg=''
        }
    },
    extraReducers:builder=>builder
    .addCase(userAuthorloginThunk.pending,(state,action)=>{
        state.isPending=true;
    })
    .addCase(userAuthorloginThunk.fulfilled,(state,action)=>{
        state.isPending=false;
        state.currentUser = action.payload.user || action.payload.author || action.payload.admin;
        state.loginUserStatus=true;
        state.errMsg=''
        state.errorOccured=false;
    })
    .addCase(userAuthorloginThunk.rejected,(state,action)=>{
        state.isPending=false;
        state.currentUser={};
        state.loginUserStatus=false;
        state.errMsg=action.payload
        state.errorOccured=true;
    }),
});

//export action creator
 export const {resetState}=userAuthorslice.actions;
//export redyucer
export default userAuthorslice.reducer;
