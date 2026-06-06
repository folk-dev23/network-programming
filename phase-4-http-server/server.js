const net = require('net')

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    // แปลง raw data เป็น string
    const request = data.toString()

    // อ่านบรรทัดแรกของ HTTP Request
    const firstLine = request.split('\n')[0]
    const method = firstLine.split(' ')[0]
    const path = firstLine.split(' ')[1]

    console.log(`📨 ${method} ${path}`)

    // สร้าง Response ตาม path
    let body = ''
    let status = '200 OK'

    if (path === '/') {
      body = '<h1>สวัสดีครับ! นี่คือ HTTP Server ของ Folk</h1>'
    } else if (path === '/about') {
      body = '<h1>About Page</h1><p>สร้างด้วย TCP Socket จากศูนย์!</p>'
    } else {
      status = '404 Not Found'
      body = '<h1>404 - ไม่พบหน้านี้ครับ</h1>'
    }

    // สร้าง HTTP Response
    const response = [
      `HTTP/1.1 ${status}`,
      'Content-Type: text/html; charset=utf-8',
      `Content-Length: ${Buffer.byteLength(body)}`,
      'Connection: close',
      '',
      body
    ].join('\r\n')

    // ส่ง Response กลับไป
    socket.write(response)
    socket.end()
  })

  socket.on('error', (err) => {
    console.log(`⚠️  Socket error: ${err.code}`)
  })
})

server.listen(3000, () => {
  console.log('🚀 HTTP Server เปิดอยู่ที่ Port 3000')
  console.log('   เปิด Browser แล้วไปที่ http://localhost:3000')
})