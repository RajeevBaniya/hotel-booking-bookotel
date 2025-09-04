import { Redis } from "@upstash/redis";

const ENABLED = String(process.env.ENABLE_CACHE || "").toLowerCase() === "true";

let client = null;
if (ENABLED && process.env.REDIS_URL && process.env.REDIS_TOKEN) {
  client = new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_TOKEN,
  });
}

export const isCacheEnabled = () => Boolean(client);

export const getJSON = async (key) => {
  try {
    if (!client) return null;
    const data = await client.get(key);
    return data || null;
  } catch {
    return null;
  }
};

export const setJSON = async (key, value, ttlSeconds = 120) => {
  try {
    if (!client) return;
    await client.set(key, value, { ex: ttlSeconds });
  } catch {
    // ignore
  }
};

export const del = async (key) => {
  try {
    if (!client) return;
    await client.del(key);
  } catch {
    // ignore
  }
};


