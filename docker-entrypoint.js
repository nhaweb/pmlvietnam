#!/usr/bin/env node

const { spawn } = require('node:child_process')

const env = { ...process.env }

;(async () => {
  // Pages are prerendered at image build time — do not regenerate on boot
  // (that spike is what OOM'd the 512MB machine).
  await exec(process.argv.slice(2).join(' '))
})()

function exec(command) {
  const child = spawn(command, { shell: true, stdio: 'inherit', env })
  return new Promise((resolve, reject) => {
    child.on('exit', code => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`${command} failed rc=${code}`))
      }
    })
  })
}