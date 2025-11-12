import { NextRequest, NextResponse } from 'next/server';
import { generateCompletion, parseAIJSON } from '@/lib/ai/unified-client';
import { generateSitePrompt } from '@/lib/ai/prompts';

export async function POST(req: NextRequest) {
  try {
    const { name, description, industry, aiConfig } = await req.json();

    if (!name || !description || !industry) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const prompt = generateSitePrompt(name, description, industry);

    // Use unified AI client that works with OpenRouter, Claude, OpenAI, etc.
    // Frontend can override provider and model via aiConfig
    const response = await generateCompletion([
      {
        role: 'user',
        content: prompt,
      },
    ], aiConfig);

    // Parse JSON response (handles markdown code blocks)
    const generatedData = parseAIJSON(response.text);

    return NextResponse.json(generatedData);
  } catch (error) {
    console.error('AI Generation Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate site' },
      { status: 500 }
    );
  }
}
