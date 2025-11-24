// A small helper to lazily initialize and return a Supabase client from
// environment variables. This uses dynamic import to remain compatible with
// the project's CommonJS setup.
let client = null;

async function init() {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  // Prefer a server-side service role key if provided (needed for inserts when
  // row level security is enabled). Keep service_role secret and only set it
  // on the server environment.
  const key = process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_KEY;
  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_KEY');
  }

  const { createClient } = await import('@supabase/supabase-js');
  client = createClient(url, key, {
    // use default options; adjust if you need different settings
  });

  if (process.env.SUPABASE_SERVICE_ROLE) {
    console.log('✅ Supabase: using service_role key (server mode)');
  } else {
    console.log('✅ Supabase: using provided key');
  }

  return client;
}

module.exports = {
  getClient: async () => {
    return await init();
  }
};
