const ALLOWED_ORIGIN = 'https://trygvevorn.github.io';
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
// claude-sonnet-4-20250514 was retired on 2026-06-15 (API answered 404 "model: claude-sonnet-4-20250514").
// Keep in sync with CLAUDE_MODEL in index.html.
const DEFAULT_MODEL = 'claude-sonnet-5';
const RATE_LIMIT = 20; // requests per minute per IP

const ipRequests = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const window = 60_000;
  let timestamps = ipRequests.get(ip) || [];
  timestamps = timestamps.filter(t => now - t < window);
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  ipRequests.set(ip, timestamps);
  return false;
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    // Only POST allowed
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders(origin) });
    }

    // CORS check
    if (origin !== ALLOWED_ORIGIN) {
      return new Response('Forbidden', { status: 403 });
    }

    // Rate limit by IP
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({ error: { message: 'Rate limited. Try again shortly.' } }), {
        status: 429,
        headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
      });
    }

    try {
      const body = await request.json();

      // Only allow expected fields through
      const payload = {
        model: body.model || DEFAULT_MODEL,
        max_tokens: Math.min(body.max_tokens || 8192, 8192),
        system: body.system,
        messages: [{ role: 'user', content: body.user }],
      };
      // Sonnet 5 and newer reject non-default temperature/top_p/top_k with HTTP 400.
      // Forward temperature only when the client explicitly asks for it; never inject a default.
      if (typeof body.temperature === 'number') payload.temperature = body.temperature;
      // Let the client control thinking (e.g. { type: 'disabled' } to keep max_tokens for the answer).
      if (body.thinking && typeof body.thinking === 'object') payload.thinking = body.thinking;

      const apiResponse = await fetch(ANTHROPIC_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(payload),
      });

      const data = await apiResponse.text();
      return new Response(data, {
        status: apiResponse.status,
        headers: {
          ...corsHeaders(origin),
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: { message: 'Proxy error' } }), {
        status: 500,
        headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
      });
    }
  },
};
