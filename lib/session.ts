import { SignJWT, jwtVerify } from 'jose'; import { cookies } from 'next/headers'
const secret = new TextEncoder().encode(process.env.SESSION_SECRET||'dev-secret')
export async function setSession(payload:any){const token = await new SignJWT(payload).setProtectedHeader({alg:'HS256'}).setExpirationTime('7d').sign(secret);cookies().set('session',token,{httpOnly:true,secure:true,sameSite:'lax',path:'/'})}
export async function getSession(){const c = cookies().get('session')?.value; if(!c) return null; try{const {payload}=await jwtVerify(c,secret);return payload}catch{return null}}
