'use client'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
const items=[{href:'/',label:'Главная'},{href:'/services',label:'Сервисы'},{href:'/threads',label:'Истории'},{href:'/account',label:'Кабинет'}]
export default function BottomNav(){const p=usePathname();return(<nav className='navbar'><div className='mx-auto max-w-screen-md grid grid-cols-4'>{items.map(i=>(<Link key={i.href} href={i.href} className={'text-center text-xs px-3 py-2 '+(p===i.href?'text-white font-semibold':'text-slate-400')}>{i.label}</Link>))}</div></nav>)}
