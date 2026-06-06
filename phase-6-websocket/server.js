const http = require('http')
const crypto = require('crypto')

// ฟังก์ชัน สร้าง WebSocket Accept Key
function generateAcceptKey(key) {
  return crypto
    .createHash('sha1')
    .update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
    .digest('base64')
}

// ฟังก์ชัน decode WebSocket Frame ที่ได้รับจาก Browser
function decodeFrame(buffer) {
  const isMasked = (buffer[1] & 0x80) !== 0
  const payloadLength = buffer[1] & 0x7f
  const maskStart = 2
  const dataStart = isMasked ? maskStart + 4 : maskStart
  const mask = isMasked ? buffer.slice(maskStart, maskStart + 4) : null
  const payload = buffer.slice(dataStart, dataStart + payloadLength)

  if (isMasked) {
    for (let i = 0; i < payload.length; i++) {
      payload[i] ^= mask[i % 4]
    }
  }

  return payload.toString()
}

// ฟังก์ชัน encode WebSocket Frame เพื่อส่งกลับไป
function encodeFrame(message) {
  const payload = Buffer.from(message)
  const frame = Buffer.alloc(2 + payload.length)
  frame[0] = 0x81 // FIN + text frame
  frame[1] = payload.length
  payload.copy(frame, 2)
  return frame
}

// เก็บ Client ทุกคน
const clients = []

const server = http.createServer((req, res) => {
  res.writeHead(200)
  res.end('WebSocket Server ของ Folk')
})

server.on('upgrade', (req, socket) => {
  // ทำ WebSocket Handshake
  const key = req.headers['sec-websocket-key']
  const acceptKey = generateAcceptKey(key)

  socket.write([
    'HTTP/1.1 101 Switching Protocols',
    'Upgrade: websocket',
    'Connection: Upgrade',
    `Sec-WebSocket-Accept: ${acceptKey}`,
    '\r\n'
  ].join('\r\n'))

  clients.push(socket)
  console.log(`✅ Client เชื่อมต่อแล้ว! (ทั้งหมด ${clients.length} คน)`)

  socket.on('data', (buffer) => {
    const message = decodeFrame(buffer)
    console.log(`📨 ได้รับ: ${message}`)

    // Broadcast ไปทุก Client
    clients.forEach((client) => {
      client.write(encodeFrame(`📢 ${message}`))
    })
  })

  socket.on('end', () => {
    const index = clients.indexOf(socket)
    clients.splice(index, 1)
    console.log(`❌ Client ออกแล้ว! (เหลือ ${clients.length} คน)`)
  })

  socket.on('error', (err) => {
    console.log(`⚠️  error: ${err.code}`)
  })
})

server.listen(3000, () => {
  console.log('🚀 WebSocket Server เปิดอยู่ที่ Port 3000')
})