const bcrypt = require("bcrypt");
const supabaseHelper = require("./supabaseClient");

async function getClient() {
  return await supabaseHelper.getClient();
}

async function findUserByEmail(email) {
  const supabase = await getClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, email, role, password_hash, created_at')
    .eq('email', email)
    .limit(1);
  if (error) throw error;
  return data && data[0] ? mapUserRow(data[0]) : null;
}

async function getUserById(id) {
  const supabase = await getClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, email, role, password_hash, created_at')
    .eq('id', id)
    .limit(1);
  if (error) throw error;
  return data && data[0] ? mapUserRow(data[0]) : null;
}

function mapUserRow(row) {
  return {
    _id: row.id,
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    passwordHash: row.password_hash,
    createdAt: row.created_at
  };
}

async function createUserHashed(email, password, name = 'Client', role = 'client') {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const supabase = await getClient();
  const { data, error } = await supabase
    .from('profiles')
    .insert([{ email, name, role, password_hash: hash }])
    .select('id, name, email, role, password_hash, created_at')
    .limit(1);
  if (error) throw error;
  return mapUserRow(data[0]);
}

async function createMfa(userId, code, expiresAt) {
  const supabase = await getClient();
  const { data, error } = await supabase
    .from('mfas')
    .insert([{ user_id: userId, code: String(code), expires_at: expiresAt, attempts: 0 }])
    .select('id, user_id, code, expires_at, attempts')
    .limit(1);
  if (error) throw error;
  return data[0];
}

async function findMfaById(id) {
  const supabase = await getClient();
  const { data, error } = await supabase
    .from('mfas')
    .select('id, user_id, code, expires_at, attempts')
    .eq('id', id)
    .limit(1);
  if (error) throw error;
  return data && data[0] ? data[0] : null;
}

async function incrementMfaAttempts(id) {
  const supabase = await getClient();
  // simple increment: fetch then update
  const mfa = await findMfaById(id);
  if (!mfa) return null;
  const { data, error } = await supabase
    .from('mfas')
    .update({ attempts: (mfa.attempts || 0) + 1 })
    .eq('id', id)
    .select('id, attempts')
    .limit(1);
  if (error) throw error;
  return data && data[0] ? data[0] : null;
}

async function deleteMfa(id) {
  const supabase = await getClient();
  const { error } = await supabase
    .from('mfas')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}

async function createAuditLog({ userId = null, email = null, ip = 'unknown', userAgent = '', action = '', details = {} }) {
  const supabase = await getClient();
  const { data, error } = await supabase
    .from('audit_logs')
    .insert([{ user_id: userId, email, ip, user_agent: userAgent, action, details }])
    .select('id')
    .limit(1);
  if (error) throw error;
  return data && data[0] ? data[0] : null;
}

async function getAuditLogs(limit = 100) {
  const supabase = await getClient();
  const { data, error } = await supabase
    .from('audit_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

module.exports = {
  findUserByEmail,
  getUserById,
  createUserHashed,
  createMfa,
  findMfaById,
  incrementMfaAttempts,
  deleteMfa,
  createAuditLog,
  getAuditLogs
};
