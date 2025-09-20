import BottomNav from '@/components/ui/BottomNav'
import ServiceCard from '@/components/ui/ServiceCard'
const data=[{code:'chatgpt',name:'ChatGPT',about:'Текстовый ассистент',tier:'standard'},{code:'claude',name:'Claude',about:'Длинные тексты',tier:'standard'},{code:'dalle',name:'DALL·E',about:'Генерация изображений',tier:'standard'},{code:'midjourney',name:'Midjourney',about:'Творческие изображения',tier:'pro'}] as const
export default function Services(){return(<main className='pb-16 p-4 max-w-screen-md mx-auto'><h1 className='text-xl font-semibold mb-3'>Сервисы</h1><div className='grid grid-cols-2 gap-3'>{data.map(s=>(<ServiceCard key={s.code} {...(s as any)}/>))}</div><BottomNav/></main>)}
