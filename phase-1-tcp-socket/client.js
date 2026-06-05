const net = require('net')

// เชื่อมต่อไปหา Server ที่ localhost:3000
const client = net.createConnection({ port: 3000 }, () => {
  console.log('✅ เชื่อมต่อ Server สำเร็จ!')

  // ส่งข้อมูลไปหา Server
  client.write('สวัสดีครับ Server! ฉันชื่อ Folk')
})

// เมื่อได้รับข้อมูลจาก Server
client.on('data', (data) => {
  console.log(`📨 Server ตอบกลับ: ${data.toString()}`)
})

// เมื่อ Server ตัดการเชื่อมต่อ
client.on('end', () => {
  console.log('❌ Server ตัดการเชื่อมต่อแล้ว')
})

// ดักจับ error
client.on('error', (err) => {
  console.log(`⚠️  เชื่อมต่อไม่ได้: ${err.code}`)
})