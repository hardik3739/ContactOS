import { execSync } from 'child_process';
import fs from 'fs';
try {
  const output = execSync('npm run build', { encoding: 'utf-8' });
  fs.writeFileSync('build-log.txt', output);
} catch (error) {
  fs.writeFileSync('build-log.txt', error.stdout + '\n' + error.stderr);
}
