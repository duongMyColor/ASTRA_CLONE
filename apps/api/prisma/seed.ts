// Ref: https://gist.github.com/alexanderson1993/0852a8162ebac591b62a79883a81e1a8

import fs from 'fs';
import { exec } from 'node:child_process';
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import toml from '@iarna/toml';

// Get the --env argument
const envArgIndex = process.argv.indexOf('--env');
const env = envArgIndex !== -1 ? process.argv[envArgIndex + 1] : undefined;

// Read the SQL file
const sql = fs.readFileSync('prisma/seed.sql').toString();
const wranglerConfig = fs.readFileSync('wrangler.toml').toString();
const parsedConfig: ParsedConfig = toml.parse(wranglerConfig);

interface ParsedConfig {
  d1_databases?: {
    database_name: string;
  }[];
  env?: {
    [key: string]: {
      d1_databases: {
        database_name: string;
      }[];
    };
  };
}

const databaseName = env
  ? parsedConfig.env?.[env]?.d1_databases?.[0]?.database_name
  : parsedConfig.d1_databases?.[0]?.database_name;

const statements = sql.split(';').map(
  (statement: string) =>
    statement
      .trim()
      .replace(/--.*$/gm, '') // remove comments
      .replace(/[\r\n]/g, ' ') // remove line breaks
);
const asyncExec = (command: string) =>
  new Promise<string>((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });

// Execute each statement
(async () => {
  for (const statement of statements) {
    if (!statement) {
      continue;
    }
    const command = `npx wrangler d1 execute ${databaseName} --remote --command="${statement}"`;
    // const command = `npx wrangler d1 execute ${databaseName} --remote ${env ? `--env ${env}` : ''} --command="${statement}"`;
    console.log(command);
    try {
      await asyncExec(command);
    } catch (error) {
      console.error(error);
    }
  }
})();
