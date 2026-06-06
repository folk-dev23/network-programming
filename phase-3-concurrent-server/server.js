const net = require('net')

// เก็บ Client ทุกคนที่เชื่อมต่ออยู่
const clients = []

const server = net.createServer((socket) => {
  // เพิ่ม Client ใหม่เข้า list
  clients.push(socket)
  console.log(`✅ Client เชื่อมต่อแล้ว! (ทั้งหมด ${clients.length} คน)`)

  // เมื่อได้รับข้อมูลจาก Client คนนี้
  socket.on('data', (data) => {
    console.log(`📨 ได้รับ: ${data.toString()}`)

    // broadcast ไปหาทุก Client ที่เชื่อมต่ออยู่
    clients.forEach((client) => {
      client.write(`📢 ${data.toString()}`)
    })
  })

  // เมื่อ Client คนนี้ตัดการเชื่อมต่อ
  socket.on('end', () => {
    // ลบออกจาก list
    const index = clients.indexOf(socket)
    clients.splice(index, 1)
    console.log(`❌ Client ออกแล้ว! (เหลือ ${clients.length} คน)`)
  })

  socket.on('error', (err) => {
    console.log(`⚠️  Socket error: ${err.code}`)
  })
})

server.listen(3000, () => {
  console.log('🚀 Concurrent TCP Server เปิดอยู่ที่ Port 3000')
  console.log('   รอ Client เชื่อมต่อ...')
})