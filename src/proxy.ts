import { NextResponse } from 'next/server';

export default async function proxy() {
  return NextResponse.next();
}

export { proxy };

export const config = {
  matcher: [],
};
