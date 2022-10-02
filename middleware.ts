import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
    if(req.nextUrl.pathname.startsWith('/api/entries/')){
        const id = req.nextUrl.pathname.replace('/api/entries/','');
        const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
        // console.log(id);
        if(!checkMongoIDRegExp.test(id)){
            const newUrl = req.nextUrl.clone();
            newUrl.pathname='/api/bad-request';
            newUrl.search=`?message='${id}' este id no es valido.`

            return NextResponse.rewrite(newUrl);
        }
    }
  return NextResponse.next();
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/entries/:id*','/api/hello'],
//   matcher: '/api/:path*',
//   matcher: '/about/:path*',
}