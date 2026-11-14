// Barakah OS — public Supabase client config.
// ONLY the publishable (anon) key belongs here: it is safe to ship to browsers
// because Row Level Security (see supabase/migrations) protects every table.
// NEVER put the service_role / secret key or the database password in this repo.
export const SUPABASE = {
  url: 'https://lglkzbzudppudyknzudx.supabase.co',
  publishableKey: 'sb_publishable_Y4pd3gmY0PqFl5DHKV7-mQ_DoMNQVrC',
  projectRef: 'lglkzbzudppudyknzudx',
};
