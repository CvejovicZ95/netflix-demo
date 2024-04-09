import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Dobijte apsolutnu putanju do direktorija gdje se nalazi trenutni modul
const currentDir = path.dirname(fileURLToPath(import.meta.url));

// Učitajte apsolutnu putanju do config.json datoteke
const configPath = path.resolve(currentDir, '../../config.json');
const configData = fs.readFileSync(configPath);
const config = JSON.parse(configData);

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, config.secret_key, {
    expiresIn: '30m'
  });

  res.cookie('token', token, {
    maxAge: 30 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
  });

  return token;
}

export { generateTokenAndSetCookie };
