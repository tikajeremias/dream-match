import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('name');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is missing' }, { status: 400 });
  }

  const res = await fetch(`https://apiv3.apifootball.com/?action=get_players&player_name=${query}&APIkey=${process.env.NEXT_PUBLIC_API_KEY}`, {
    // headers: {
    //   'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    // },

    // La API no permite Bearer token.
    
  });

  const data = await res.json();
  return NextResponse.json(data);
}
