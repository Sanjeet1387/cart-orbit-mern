//this will keep/hold  all the application's states
//we need to create all slices for each and everything, we need a different slice

//now we need to combine all slices into to one slice whatever we will be having and that will create a global reducer

import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductsSlice from './admin/products-slice';
import adminOrderSlice from './admin/order-slice';

import shopProductsSlice from './shop/products-slice';
import shopCartSlice from './shop/cart-slice';
import shopAddressSlice from './shop/address-slice';
import shopOrderSlice from './shop/order-slice';
import shopSearchSlice from './shop/search-slice';
import shopReviewSlice from './shop/review-slice';

import commonFeatureSlice from './common-slice';


const store = configureStore({
    reducer : {
        auth : authReducer,
        
        adminProducts : adminProductsSlice,
        adminOrder : adminOrderSlice,

        shopProducts : shopProductsSlice,
        shopCart : shopCartSlice,
        shopAddress : shopAddressSlice,
        shopOrder : shopOrderSlice,
        shopSearch : shopSearchSlice,
        shopReview : shopReviewSlice,
        
        commonFeature : commonFeatureSlice
    },
});

export default store;

//now this store need to connect with the react application -> this is done inside main.jsx