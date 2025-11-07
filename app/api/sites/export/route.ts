import { NextRequest, NextResponse } from 'next/server';
import { exportToHTML } from '@/lib/export/htmlExporter';

export async function POST(req: NextRequest) {
  try {
    const site = await req.json();

    if (!site || !site.blocks) {
      return NextResponse.json(
        { error: 'Invalid site data' },
        { status: 400 }
      );
    }

    const html = exportToHTML(site);

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="${site.name || 'site'}.html"`,
      },
    });
  } catch (error) {
    console.error('Export Error:', error);
    return NextResponse.json(
      { error: 'Failed to export site' },
      { status: 500 }
    );
  }
}
