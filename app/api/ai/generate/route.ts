import { NextRequest, NextResponse } from 'next/server';
import anthropic from '@/lib/ai/client';
import { generateSitePrompt } from '@/lib/ai/prompts';

export async function POST(req: NextRequest) {
  try {
    const { name, description, industry } = await req.json();

    if (!name || !description || !industry) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const prompt = generateSitePrompt(name, description, industry);

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    // Parse the JSON response from Claude
    // Remove markdown code blocks if present (```json ... ```)
    let jsonText = content.text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\s*\n/, '').replace(/\n```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\s*\n/, '').replace(/\n```$/, '');
    }

    const generatedData = JSON.parse(jsonText);

    return NextResponse.json(generatedData);
  } catch (error) {
    console.error('AI Generation Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate site' },
      { status: 500 }
    );
  }
}
