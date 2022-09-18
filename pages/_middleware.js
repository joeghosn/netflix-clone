
import { verifyToken } from "../utils/utils";


export async function middleware(request, event) {
const token= request?request.cookies?.token: null;
const userId=await verifyToken(token);


if((token&&userId) || request.nextUrl.pathname.includes('login')){
    return NextResponse.next();
}

   if(!token &&request.nextUrl.pathname!=='/login'){
    return NextResponse.redirect('/login');
   }

   
  }