const net = require('net')
const readline = require('readline')

// รับ argument ชื่อจาก terminal เช่น node client.js Folk
const name = process.argv[2] || 'Anonymous'

const client = net.createConnection({ port: 3000 }, () => {
  console.log(`✅ เชื่อมต่อสำเร็จ! ชื่อของคุณคือ "${name}"`)
  console.log('   พิมพ์ข้อความแล้วกด Enter ได้เลย')
})

// รับ input จาก keyboard
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// เมื่อพิมพ์ข้อความแล้วกด Enter
rl.on('line', (line) => {
  client.write(`${name}: ${line}`)
})

// เมื่อได้รับข้อมูลจาก Server
client.on('data', (data) => {
  console.log(data.toString())
})

client.on('end', () => {
  console.log('❌ Server ตัดการเชื่อมต่อแล้ว')
  rl.close()
})

client.on('error', (err) => {
  console.log(`⚠️  เชื่อมต่อไม่ได้: ${err.code}`)
})