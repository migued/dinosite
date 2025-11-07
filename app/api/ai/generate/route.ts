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
      model: 'claude-3-5-sonnet-20241022',
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
    const generatedData = JSON.parse(content.text);

    return NextResponse.json(generatedData);
  } catch (error) {
    console.error('AI Generation Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate site' },
      { status: 500 }
    );
  }
}
