const dgram = require('dgram')

// สร้าง UDP Socket
const client = dgram.createSocket('udp4')

// ส่งข้อมูลไปหา Server
client.send('สวัสดีครับ UDP Server! ฉันชื่อ Folk', 4000, 'localhost', (err) => {
  if (err) {
    console.log(`⚠️  ส่งไม่ได้: ${err}`)
  } else {
    console.log('📤 ส่งข้อมูลไปแล้ว!')
  }
})

// เมื่อได้รับข้อมูลกลับจาก Server
client.on('message', (msg) => {
  console.log(`📨 Server ตอบกลับ: ${msg.toString()}`)

  // ปิด Socket หลังได้รับข้อมูลแล้ว
  client.close()
})

// ดักจับ error
client.on('error', (err) => {
  console.log(`⚠️  error: ${err.code}`)
})