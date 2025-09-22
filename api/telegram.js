// api/telegram.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).send('ok');

  // необязательная защита: сверим секрет, если задан
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  const got = req.headers['x-telegram-bot-api-secret-token'];
  if (secret && got !== secret) return res.status(401).send('forbidden');

  let update = req.body;
  if (!update || typeof update !== 'object') {
    try { update = JSON.parse(await streamToString(req)); } catch {}
  }
  if (!update?.message) return res.status(200).send('ok');

  const chatId = update.message.chat.id;
  const text = (update.message.text || '').trim();

  if (text === '/start') {
    await tgSend(chatId, 'Привет! Я Cognera. Напиши любой текст — отвечу эхо. /clear чтобы очистить.');
    return res.status(200).send('ok');
  }
  if (text === '/clear') {
    await tgSend(chatId, 'Память пока не подключена. Скоро добавим историю через Supabase.');
    return res.status(200).send('ok');
  }

  await tgSend(chatId, `Ты написал: ${text}`);
  return res.status(200).send('ok');

  async function tgSend(chat, reply) {
    const url = https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text: reply })
    });
  }
}

async function streamToString(req) {
  const chunks = [];
  for await (const c of req) chunks.push(Buffer.from(c));
  return Buffer.concat(chunks).toString('utf8');
}
