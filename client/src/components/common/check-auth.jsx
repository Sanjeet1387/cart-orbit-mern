//note: inside the common components , we create common related components that we are going to use
//one of those is check-auth.jsx -> this is all about authentication and authorization logic

import { useLocation , Navigate } from "react-router-dom";

//this components check the authentication related things
//this will receive some things example:- isAuthenticated -> check user is authenticated or not
//user -> means user related information such name, email, password etc
//children -> it is nothing but the component that we want to render

function CheckAuth({isAuthenticated, user, children}) {

    const location = useLocation() //this will give/tell the current location on that you are at. ex:- auth/login etc.
    
    // console.log(location.pathname, isAuthenticated);

//     if (location.pathname === "/") {
//     if (!isAuthenticated) {
//       return <Navigate to="/auth/login" />;
//     } else {
//       if (user?.role === "admin") {
//         return <Navigate to="/admin/dashboard" />;
//       } else {
//         return <Navigate to="/shop/home" />;
//       }
//     }
//   }

//logic for improvement of home page
 if(location.pathname === '/'){
  if(!isAuthenticated){
    return <Navigate to="/auth/login" />;
  }else {
    //return based on user's role
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }
 }
 
  //if user is not authenticated but they are trying to access a different page other than login or register page
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  //if user are authenticated and they are trying to access login or register page, then navigate them 
  //on the based of their role
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  //if user is authenticated and he is a normal user but trying to access the admin pages,then navigate him to the unauth-page
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  //if user is authenticated and he is an admin and trying to access shopping pages,then navigate him to 
  //to the /admin/dashboard page
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }
 
  //if no any conditions satisfied that are mentioned above, then simply return the children 
  return <>{children}</>; //children is nothing but the component that is inside the CheckAuth component in the app.jsx
}

export default CheckAuth;

