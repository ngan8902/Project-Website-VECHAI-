import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  let cookie = request.cookies.get('vechaitoken')
  if(!cookie || !cookie.value) return NextResponse.redirect(new URL('/Login', request.url))

  console.log('Cookieee:::', cookie)
  const { name, value } = cookie
  fetch(process.env['SERVERHOST'] + '/api/customer/authen', {
    method: 'GET',
    headers: {
      'authorization': value
    },
  }).then(response => response.json())
    .then((data) => {
      console.log('Data:::::', data)
    }).catch((err) => {
      console.log(err)
      NextResponse.redirect(new URL('/Login', request.url))
    })
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}