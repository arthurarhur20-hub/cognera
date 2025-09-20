import { NextResponse } from 'next/server'
export async function GET(){return NextResponse.json({plan:'free', limits:{text:20,image:5,video:0,audio:0}, expires_at:null}) }
