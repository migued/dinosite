/**
 * Unified AI Client that supports multiple providers:
 * - OpenRouter (default with Qwen)
 * - Anthropic Claude (direct)
 * - OpenAI (direct)
 * - Any OpenAI-compatible API
 *
 * Configure via environment variables:
 * AI_PROVIDER: 'openrouter' | 'anthropic' | 'openai' | 'custom'
 * AI_API_KEY: Your API key
 * AI_MODEL: Model to use
 * AI_BASE_URL: Base URL for custom/OpenRouter endpoints
 */

const AI_PROVIDER = process.env.AI_PROVIDER || 'openrouter';
const AI_API_KEY = process.env.AI_API_KEY || process.env.OPENROUTER_API_KEY || process.env.ANTHROPIC_API_KEY;
const AI_MODEL = process.env.AI_MODEL || 'qwen/qwen-2.5-coder-32b-instruct';
const AI_BASE_URL = process.env.AI_BASE_URL || 'https://openrouter.ai/api/v1';

interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AIResponse {
  text: string;
}

interface AIConfigOverride {
  provider?: string;
  model?: string;
}

/**
 * Generate completion using the configured AI provider
 * @param messages - Array of messages to send to the AI
 * @param override - Optional config to override environment variables
 */
export async function generateCompletion(
  messages: AIMessage[],
  override?: AIConfigOverride
): Promise<AIResponse> {
  // Allow frontend to override provider and model
  const provider = override?.provider || AI_PROVIDER;
  const model = override?.model || AI_MODEL;
  // OpenRouter / OpenAI-compatible endpoint
  if (provider === 'openrouter' || provider === 'openai' || provider === 'custom') {
    const response = await fetch(`${AI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_API_KEY}`,
        ...(provider === 'openrouter' && {
          'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000',
          'X-Title': 'DinoSite AI Builder',
        }),
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`AI API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return { text: data.choices[0].message.content };
  }

  // Anthropic Claude direct API
  if (provider === 'anthropic') {
    const Anthropic = require('@anthropic-ai/sdk');
    const client = new Anthropic.Anthropic({
      apiKey: AI_API_KEY,
    });

    const message = await client.messages.create({
      model: model || 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      messages: messages,
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Anthropic');
    }

    return { text: content.text };
  }

  throw new Error(`Unsupported AI provider: ${provider}`);
}

/**
 * Parse JSON response, handling markdown code blocks
 */
export function parseAIJSON(text: string): any {
  let jsonText = text.trim();

  // Remove markdown code blocks if present
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.replace(/^```json\s*\n/, '').replace(/\n```$/, '');
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/^```\s*\n/, '').replace(/\n```$/, '');
  }

  return JSON.parse(jsonText);
}

// Export configuration for reference
export const aiConfig = {
  provider: AI_PROVIDER,
  model: AI_MODEL,
  baseUrl: AI_BASE_URL,
};
