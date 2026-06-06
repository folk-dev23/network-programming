const dgram = require('dgram')

// สร้าง UDP Socket
const server = dgram.createSocket('udp4')

// เมื่อได้รับข้อมูล
server.on('message', (msg, rinfo) => {
  console.log(`📨 ได้รับข้อมูลจาก ${rinfo.address}:${rinfo.port}`)
  console.log(`   ข้อความ: ${msg.toString()}`)

  // ส่งข้อมูลกลับไปหา Client
  server.send(`🔁 Server ได้รับแล้ว: ${msg.toString()}`, rinfo.port, rinfo.address)
})

// เมื่อ Server พร้อมทำงาน
server.on('listening', () => {
  const address = server.address()
  console.log(`🚀 UDP Server เปิดอยู่ที่ Port ${address.port}`)
  console.log('   รอรับข้อมูล...')
})

// เปิด Server ที่ Port 4000
server.bind(4000)