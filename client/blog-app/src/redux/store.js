//create redux store
import {configureStore} from '@reduxjs/toolkit';
import userAuthorReducer from './slices/userAuthorslice';
export const store=configureStore({
    reducer:{
        userAuthoruserAuthorLoginReducer:userAuthorReducer
    }
})