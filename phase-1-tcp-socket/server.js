const net = require('net')

const server = net.createServer((socket) => {
  console.log('✅ Client เชื่อมต่อแล้ว!')
  console.log(`   IP: ${socket.remoteAddress}`)
  console.log(`   Port: ${socket.remotePort}`)

  socket.on('data', (data) => {
    console.log(`📨 ได้รับข้อมูล: ${data.toString()}`)
  })

  socket.on('end', () => {
    console.log('❌ Client ตัดการเชื่อมต่อแล้ว')
  })

  socket.on('error', (err) => {
    console.log(`⚠️  Socket error: ${err.code}`)
  })
})

server.listen(3000, () => {
  console.log('🚀 TCP Server เปิดอยู่ที่ Port 3000')
  console.log('   รอ Client เชื่อมต่อ...')
})