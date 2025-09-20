import { NextRequest, NextResponse } from 'next/server'
export async function POST(req:NextRequest){ // TODO: verify signatures and credit balance
return NextResponse.json({ok:true}) }
