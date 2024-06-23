import { auth } from "./auth";
import { NextResponse } from "next/server";
import { 
    publicRoutes, 
    authenticationRoutes, 
    apiRoute, 
    adminRoute,
    extendedAdminRoute
} from "@/auth/middleware_routes";

export default auth((req) => {
  const { nextUrl } = req;
  const userLogin = !!req.auth;
  const user = req.auth?.user

  // if middleware is in api auth route
  const isApiAuth = nextUrl.pathname.startsWith(apiRoute);
  // if middleware is in public routes
  const isPublic = publicRoutes.includes(nextUrl.pathname);
  // if middleware is in signin and signup(when user is signin but trying to access the login)
  const isAuth = authenticationRoutes.includes(nextUrl.pathname);
  // if is in admin page and not admin
  const isAdmin = nextUrl.pathname.startsWith(adminRoute);
  const extendedAdmin = extendedAdminRoute.includes(nextUrl.pathname);

  // accessible to everyone
  if(isApiAuth){
    return;
  }
  // if user is in auth route but is signin
  if(isAuth){
    if(userLogin){
      return NextResponse.redirect(new URL("/", nextUrl))
    }
    return;
  }
  // If user is in protected routes but he/she not login
  if(!userLogin && !isPublic){
    return NextResponse.redirect(new URL("/login", nextUrl));
  }
  if(user?.role === "SUPERADMIN"){
    if(!nextUrl.pathname.startsWith("/superadmin") && !nextUrl.pathname.startsWith("/admin")){
      return NextResponse.redirect(new URL("/superadmin", nextUrl));
    }
    return;
  }
  if(user?.role === "ADMIN"){
    if(!nextUrl.pathname.startsWith("/admin")){
      return NextResponse.redirect(new URL("/admin", nextUrl));
    }
    if(nextUrl.pathname.startsWith("/superadmin")){
      return NextResponse.redirect(new URL("/admin", nextUrl));
    }
    return
  }
  if(user?.role === "USER"){
    if(nextUrl.pathname.startsWith("/admin")){
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    if(nextUrl.pathname.startsWith("/superadmin")){
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    return
  }


  // // if user is not admin
  // if(
  //   user?.role !== "ADMIN" && 
  //   isAdmin && extendedAdmin && nextUrl.pathname.startsWith("/superadmin") &&
  //   user?.role !== "SUPERADMIN"
  // ){
  //   return NextResponse.redirect(new URL("/", nextUrl));
  // }
  // // if user is admin and went to user page
  // if(
  //   user?.role === "ADMIN" &&
  //   !isAdmin && !extendedAdmin
  // ){
  //   return NextResponse.redirect(new URL("/admin", nextUrl));
  // }
  // if(
  //   user?.role === "SUPERADMIN" && 
  //   !isAdmin && !extendedAdmin
  // ){
  //   return NextResponse.redirect(new URL("/admin", nextUrl));
  // }
  return;
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}