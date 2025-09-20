import { NextRequest, NextResponse } from 'next/server'
export async function POST(req:NextRequest){const {service,text}=await req.json(); const reply=`[${service}] ${String(text||'').slice(0,500)}`; return NextResponse.json({ ok:true, output: reply }) }
