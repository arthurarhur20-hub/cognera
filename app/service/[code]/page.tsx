'use client'
import {useState} from 'react'
import ChatScreen from '@/components/chat/ChatScreen'
import BottomNav from '@/components/ui/BottomNav'
type Msg={id:string; role:'user'|'assistant'; content:string}
export default function ServicePage({params}:{params:{code:string}}){const [messages,setMessages]=useState<Msg[]>([]);async function send(text:string){setMessages(m=>[...m,{id:crypto.randomUUID(),role:'user',content:text}]);try{const res=await fetch('/api/messages/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({service:params.code,text})});const j=await res.json();setMessages(m=>[...m,{id:crypto.randomUUID(),role:'assistant',content:j.output||'Готово'}])}catch{setMessages(m=>[...m,{id:crypto.randomUUID(),role:'assistant',content:'Ошибка запроса'}])}}return(<main className='pb-16 max-w-screen-md mx-auto'><ChatScreen messages={messages as any} onSend={send} onAttach={(f)=>setMessages(m=>[...m,{id:crypto.randomUUID(),role:'user',content:`📎 ${f.name}`}])} presets={[{label:'Бренд‑идеи',prompt:'Предложи 10 идей названия бренда'}]} /><BottomNav/></main>)}
