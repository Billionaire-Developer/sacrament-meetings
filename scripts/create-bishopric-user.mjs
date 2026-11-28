
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

function ask(question) {
  const rl = createInterface({ input: stdin, output: stdout });
  return rl.question(question).finally(() => rl.close());
}

function askHidden(question) {
  return new Promise((resolve, reject) => {
    if (!stdin.isTTY || typeof stdin.setRawMode !== 'function') {
      reject(new Error('Hidden password input requires an interactive terminal.'));
      return;
    }

    let password = '';

    stdout.write(question);
    stdin.setEncoding('utf8');
    stdin.setRawMode(true);
    stdin.resume();

    function cleanup() {
      stdin.removeListener('data', handleInput);
      stdin.setRawMode(false);
      stdin.pause();
      stdout.write('\n');
    }

    function handleInput(character) {
      for (const char of character) {
        if (char === '\u0003') {
          cleanup();
          reject(new Error('Account creation cancelled.'));
          return;
        }

        if (char === '\r' || char === '\n') {
          cleanup();
          resolve(password);
          return;
        }

        if (char === '\u007f' || char === '\b') {
          password = password.slice(0, -1);
          stdout.write('\b \b');
          continue;
        }

        if (char >= ' ' && char !== '\u007f') {
          password += char;
          stdout.write('*');
        }
      }
    }

    stdin.on('data', handleInput);
  });
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      'DATABASE_URL was not found. Check your project .env file.'
    );
  }

  const sql = neon(databaseUrl);

  console.log('\nCreate a Bishopric Account\n');

  const name = (await ask('Full name: ')).trim();
  const email = (await ask('Email address: ')).trim().toLowerCase();

  if (!name || name.length > 150) {
    throw new Error('Enter a name between 1 and 150 characters.');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
    throw new Error('Enter a valid email address.');
  }

  const password = await askHidden('Password (minimum 12 characters): ');

  if (password.length < 12) {
    throw new Error('Password must contain at least 12 characters.');
  }

  const confirmation = await askHidden('Confirm password: ');

  if (password !== confirmation) {
    throw new Error('The passwords do not match.');
  }

  const existingUsers = await sql`
    SELECT id
    FROM bishopric_users
    WHERE LOWER(email) = LOWER(${email})
    LIMIT 1
  `;

  if (existingUsers.length > 0) {
    throw new Error('An account with this email address already exists.');
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await sql`
    INSERT INTO bishopric_users (
      name,
      email,
      password_hash,
      is_active
    )
    VALUES (
      ${name},
      ${email},
      ${passwordHash},
      TRUE
    )
  `;

  console.log('\nBishopric account created successfully.');
  console.log(`Account name: ${name}`);
  console.log(`Account email: ${email}`);
  console.log('The password has been securely hashed and stored.');
}

main().catch((error) => {
  console.error('\nAccount creation failed:', error.message);
  process.exitCode = 1;
});
