#!/usr/bin/env node

const { spawn } = require('child_process')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log(
  '🌲⚡️ Welcome to Luxe Lens - Redwood.js Full-Stack Application ⚡️🌲\n'
)

console.log('Choose how you want to start the application:\n')
console.log('1. Start both frontend and backend together (recommended)')
console.log('2. Start only frontend (React app)')
console.log('3. Start only backend (GraphQL API)')
console.log('4. Exit\n')

rl.question('Enter your choice (1-4): ', (choice) => {
  switch (choice.trim()) {
    case '1':
      console.log('\n🚀 Starting both frontend and backend...\n')
      startCommand('yarn', ['dev'])
      break
    case '2':
      console.log('\n🌐 Starting frontend only...\n')
      startCommand('yarn', ['dev:frontend'])
      break
    case '3':
      console.log('\n🔧 Starting backend only...\n')
      startCommand('yarn', ['dev:backend'])
      break
    case '4':
      console.log('\n👋 Goodbye!')
      rl.close()
      process.exit(0)
      break
    default:
      console.log('\n❌ Invalid choice. Please run the script again.')
      rl.close()
      process.exit(1)
  }
})

function startCommand(command, args) {
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: true,
    cwd: process.cwd(),
  })

  child.on('error', (error) => {
    console.error(`❌ Error starting application: ${error.message}`)
    rl.close()
    process.exit(1)
  })

  child.on('exit', (code) => {
    console.log(`\n📝 Application exited with code ${code}`)
    rl.close()
    process.exit(code)
  })

  // Handle Ctrl+C
  process.on('SIGINT', () => {
    console.log('\n\n🛑 Stopping application...')
    child.kill('SIGINT')
    rl.close()
    process.exit(0)
  })
}
