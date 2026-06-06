# Phase 0 — Internet Basics

## สิ่งที่เรียนรู้
- **IP Address** — Private IP (192.168.x.x) คือ IP ในบ้าน, Public IP คือ IP ที่โลกภายนอกเห็น
- **Port** — เลขห้องที่บอกว่าข้อมูลส่งให้โปรแกรมไหน เช่น Port 80=HTTP, 443=HTTPS, 3000=Node.js
- **DNS** — แปลง domain เช่น google.com → IP Address จริงๆ

## Commands ที่ใช้
| Command | ใช้ทำอะไร |
|---|---|
| `ipconfig` | ดู Private IP ของเครื่อง |
| `curl ifconfig.me` | ดู Public IP |
| `netstat -an \| grep LISTENING` | ดู Port ที่เปิดอยู่ |
| `nslookup google.com` | แปลง domain เป็น IP |
