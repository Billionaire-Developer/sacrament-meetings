
import { NextRequest, NextResponse } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

export function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date');

  const meetings = getMeetings(date);

  return NextResponse.json(meetings, {
    status: 200,
  });
}
