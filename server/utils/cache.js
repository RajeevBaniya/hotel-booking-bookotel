import { createClient } from "redis";

const ENABLED = String(process.env.ENABLE_CACHE || "").toLowerCase() === "true";

let client = null;
let connectPromise = null;

async function getClient() {
  if (
    !ENABLED ||
    !process.env.REDIS_HOST ||
    !process.env.REDIS_PORT ||
    !process.env.REDIS_PASSWORD
  ) {
    return null;
  }
  if (client?.isOpen) return client;
  if (!connectPromise) {
    const c = createClient({
      username: "default",
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    });
    connectPromise = c.connect().then(() => {
      client = c;
      return c;
    });
  }
  return connectPromise;
}

export const isCacheEnabled = () =>
  Boolean(
    ENABLED &&
      process.env.REDIS_HOST &&
      process.env.REDIS_PORT &&
      process.env.REDIS_PASSWORD
  );

export const getJSON = async (key) => {
  try {
    const c = await getClient();
    if (!c) return null;
    const data = await c.get(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const setJSON = async (key, value, ttlSeconds = 120) => {
  try {
    const c = await getClient();
    if (!c) return;
    await c.set(key, JSON.stringify(value), { EX: ttlSeconds });
  } catch {
    // ignore
  }
};

export const del = async (key) => {
  try {
    const c = await getClient();
    if (!c) return;
    await c.del(key);
  } catch {
    // ignore
  }
};
