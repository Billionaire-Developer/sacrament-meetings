
import { sql } from './db';

export type BishopricUser = {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  is_active: boolean;
};

export async function getBishopricUserByEmail(
  email: string
): Promise<BishopricUser | null> {
  const rows = await sql`
    SELECT
      id,
      name,
      email,
      password_hash,
      is_active
    FROM bishopric_users
    WHERE LOWER(email) = LOWER(${email})
    LIMIT 1
  `;

  return (rows[0] as BishopricUser | undefined) ?? null;
}
