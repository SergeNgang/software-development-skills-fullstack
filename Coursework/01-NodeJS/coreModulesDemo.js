import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import url from 'url';
import { EventEmitter } from 'events';

// 1. OS & Process Module
console.log('--- OS & Process Info ---');
console.log('Platform:', os.platform());
console.log('CPU Cores:', os.cpus().length);
console.log('Free Memory (MB):', Math.round(os.freemem() / 1024 / 1024));
console.log('Node Version:', process.version);

// 2. Path & URL Module
console.log('\n--- Path & URL Info ---');
const __filename = url.fileURLToPath(import.meta.url);
console.log('Current File:', path.basename(__filename));
const sampleUrl = new URL('http://localhost:8000/api/tasks?completed=false');
console.log('Pathname:', sampleUrl.pathname);
console.log('Query Param (completed):', sampleUrl.searchParams.get('completed'));

// 3. Events Module
console.log('\n--- Events Demo ---');
const taskEmitter = new EventEmitter();
taskEmitter.on('taskLogged', (msg) => console.log(`Event Received: ${msg}`));
taskEmitter.emit('taskLogged', 'Core modules demo executed successfully!');

// 4. File System (fs/promises) Module
const runFileDemo = async () => {
  console.log('\n--- File System Demo ---');
  const logFile = path.join(path.dirname(__filename), 'activity.log');
  await fs.writeFile(logFile, 'Log Entry 1: Initialized Node.js coursework.\n');
  await fs.appendFile(logFile, 'Log Entry 2: Verified fs, os, url, and events modules.\n');
  const content = await fs.readFile(logFile, 'utf-8');
  console.log('File Content:\n' + content);
};

runFileDemo();