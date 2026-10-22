import express from 'express';
import cors from 'cors';
import crypto from 'node:crypto';

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
const tokens = new Map();

app.get('/health', (_req, res) => res.json({ ok: true, message: 'KT2 mock API is running' }));
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Введите email и пароль.' });
  if (email !== 'demo@example.com' || password !== 'password123') {
    return res.status(401).json({ message: 'Неверный email или пароль. Для теста используйте demo@example.com / password123.' });
  }
  const token = crypto.randomBytes(24).toString('hex');
  tokens.set(token, { id: 1, name: 'Демо-пользователь', email });
  return res.json({ token, user: { id: 1, name: 'Демо-пользователь', email } });
});
app.get('/api/profile', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  const user = tokens.get(token);
  if (!user) return res.status(401).json({ message: 'Нет действующей авторизации. Войдите снова.' });
  return res.json(user);
});
app.post('/auth/logout', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  tokens.delete(token);
  res.json({ ok: true });
});
app.listen(PORT, () => console.log(`Учебный Backend API запущен: http://localhost:${PORT}`));
