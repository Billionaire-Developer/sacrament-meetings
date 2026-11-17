
import { NextRequest, NextResponse } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query') ?? '';
  const currentPage = Number(
    request.nextUrl.searchParams.get('page') ?? '1'
  );

  const meetings = await getMeetings(query, currentPage);

  return NextResponse.json(meetings, {
    status: 200,
  });
}
