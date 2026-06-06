const tls = require('tls')
const fs = require('fs')

// โหลด Certificate และ Private Key
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}

const server = tls.createServer(options, (socket) => {
  console.log('✅ Client เชื่อมต่อแล้ว (เข้ารหัสแล้ว!)')
  console.log(`   Protocol: ${socket.getProtocol()}`)
  console.log(`   Cipher: ${socket.getCipher().name}`)

  socket.on('data', (data) => {
    const request = data.toString()
    const firstLine = request.split('\n')[0]
    const method = firstLine.split(' ')[0]
    const path = firstLine.split(' ')[1]

    console.log(`📨 ${method} ${path}`)

    let body = ''
    let status = '200 OK'

    if (path === '/') {
      body = '<h1>🔒 HTTPS Server ของ Folk</h1><p>การเชื่อมต่อนี้เข้ารหัสแล้ว!</p>'
    } else if (path === '/about') {
      body = '<h1>About</h1><p>สร้างด้วย TLS จากศูนย์!</p>'
    } else {
      status = '404 Not Found'
      body = '<h1>404 - ไม่พบหน้านี้ครับ</h1>'
    }

    const response = [
      `HTTP/1.1 ${status}`,
      'Content-Type: text/html; charset=utf-8',
      `Content-Length: ${Buffer.byteLength(body)}`,
      'Connection: close',
      '',
      body
    ].join('\r\n')

    socket.write(response)
    socket.end()
  })

  socket.on('error', (err) => {
    console.log(`⚠️  Socket error: ${err.code}`)
  })
})

server.listen(8443, () => {
  console.log('🔒 HTTPS Server เปิดอยู่ที่ Port 8443')
  console.log('   เปิด Browser แล้วไปที่ https://localhost:8443')
})