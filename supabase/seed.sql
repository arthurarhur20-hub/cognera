
insert into services(code,name,category,about,tags,tier) values
-- Text
('gpt41mini','GPT‑4.1 mini','Ассистенты','Быстрый мини','{ai,text}','free'),
('gpt41','GPT‑4.1','Ассистенты','Продвинутый','{ai,text}','standard'),
('gpt45','GPT‑4.5','Ассистенты','Pro уровень','{ai,text}','pro'),
('gpt5','GPT‑5','Ассистенты','Эксперимент','{ai,text}','pro'),
('gpto1','GPT‑o1','Ассистенты','Размышления','{ai,text}','pro'),
('claude_haiku','Claude Haiku','Ассистенты','Быстрый','{ai,text}','standard'),
('claude_sonnet','Claude Sonnet','Ассистенты','Качественный','{ai,text}','pro'),
('claude_opus','Claude Opus','Ассистенты','Флагман','{ai,text}','pro'),
('mistral','Mistral','Ассистенты','Европейский','{ai,text}','standard'),
-- Images
('sd_base','Stable Diffusion Base','Изображения','Базовый SD','{image}','free'),
('dalle_mini','DALL·E mini','Изображения','Мини-версия','{image}','free'),
('sd_full','Stable Diffusion Full','Изображения','Полный SD','{image}','standard'),
('dalle3_basic','DALL·E 3 Basic','Изображения','Базовый DALL·E 3','{image}','standard'),
('sd_xl','Stable Diffusion XL','Изображения','SD XL','{image}','pro'),
('dalle3_hd','DALL·E 3 HD','Изображения','HD качество','{image}','pro'),
('midjourney','MidJourney','Изображения','Творческий','{image}','pro'),
-- Video
('veo_short','Veo short','Видео','Короткое видео','{video}','standard'),
('veo3_long','Veo long','Видео','Длинное видео','{video}','pro'),
('sora','Sora','Видео','AI видео','{video}','pro'),
('pika','Pika','Видео','Генератор','{video}','standard'),
-- Audio
('suno','Suno','Аудио','Музыка','{audio}','pro'),
('elevenlabs','ElevenLabs','Аудио','Голоса','{audio}','standard')
on conflict (code) do nothing;

insert into service_prices(service_code,op_type,price_cents) values
-- text
('gpt41mini','text',100),('gpt41','text',300),('gpt45','text',500),('gpt5','text',1000),('gpto1','text',1000),
('claude_haiku','text',300),('claude_sonnet','text',800),('claude_opus','text',1200),
-- image
('sd_base','image',500),('dalle_mini','image',500),('sd_full','image',900),
('dalle3_basic','image',1500),('sd_xl','image',2000),('dalle3_hd','image',2500),('midjourney','image',3000),
-- video
('veo_short','video',3000),('veo3_long','video',10000),('sora','video',20000),('pika','video',1500),
-- audio
('elevenlabs','audio',800),('suno','audio',2500)
on conflict do nothing;
