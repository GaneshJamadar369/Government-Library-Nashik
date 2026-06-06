import https from 'https'
import fs from 'fs'
import path from 'path'
import { createHash } from 'crypto'

const CLOUD_NAME = 'djgkoxguj'
const API_KEY = '132322327686389'
const API_SECRET = '-L5-ke0flXxr4lwZf5QfJhQc0ho'

async function uploadFile(filePath, publicId) {
  const fileBuffer = fs.readFileSync(filePath)
  const base64 = fileBuffer.toString('base64')
  const ext = path.extname(filePath).slice(1).toLowerCase()
  const mimeType = ext === 'svg' ? 'image/svg+xml' : ext === 'png' ? 'image/png' : 'image/jpeg'

  const timestamp = Math.floor(Date.now() / 1000).toString()
  const folder = publicId.split('/').slice(0, -1).join('/')
  const toSign = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}${API_SECRET}`
  const signature = createHash('sha1').update(toSign).digest('hex')

  const boundary = '----FB' + Math.random().toString(36).slice(2)
  const body = [
    `--${boundary}`, `Content-Disposition: form-data; name="file"`, ``, `data:${mimeType};base64,${base64}`,
    `--${boundary}`, `Content-Disposition: form-data; name="api_key"`, ``, API_KEY,
    `--${boundary}`, `Content-Disposition: form-data; name="timestamp"`, ``, timestamp,
    `--${boundary}`, `Content-Disposition: form-data; name="signature"`, ``, signature,
    `--${boundary}`, `Content-Disposition: form-data; name="folder"`, ``, folder,
    `--${boundary}`, `Content-Disposition: form-data; name="public_id"`, ``, publicId,
    `--${boundary}--`,
  ].join('\r\n')

  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'api.cloudinary.com',
      path: `/v1_1/${CLOUD_NAME}/image/upload`,
      method: 'POST',
      headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}`, 'Content-Length': Buffer.byteLength(body) }
    }, res => {
      let data = ''
      res.on('data', d => data += d)
      res.on('end', () => { try { resolve(JSON.parse(data)) } catch(e) { resolve({ error: data }) } })
    })
    req.on('error', e => resolve({ error: e.message }))
    req.write(body)
    req.end()
  })
}

const files = [
  ...Array.from({ length: 22 }, (_, i) => {
    const n = (i + 1).toString().padStart(2, '0')
    return { path: `public/events/event_${n}.jpg`, id: `dyansampada/events/event_${n}` }
  }),
  { path: 'public/books/bhagavad-gita.png', id: 'dyansampada/books/bhagavad-gita' },
  { path: 'public/books/brief-history-time.png', id: 'dyansampada/books/brief-history-time' },
  { path: 'public/books/ramayana.png', id: 'dyansampada/books/ramayana' },
  { path: 'public/books/upanishad.png', id: 'dyansampada/books/upanishad' },
  { path: 'public/books/vedas.png', id: 'dyansampada/books/vedas' },
  { path: 'public/icons/3d-book.png', id: 'dyansampada/icons/3d-book' },
  { path: 'public/icons/3d-community.png', id: 'dyansampada/icons/3d-community' },
  { path: 'public/icons/3d-tree.png', id: 'dyansampada/icons/3d-tree' },
  { path: 'public/icons/3d-trophy.png', id: 'dyansampada/icons/3d-trophy' },
  { path: 'public/images/leaf-1.png', id: 'dyansampada/images/leaf-1' },
  { path: 'public/images/leaf-2.png', id: 'dyansampada/images/leaf-2' },
  { path: 'public/images/leaf-3.png', id: 'dyansampada/images/leaf-3' },
  { path: 'public/images/open-book.png', id: 'dyansampada/images/open-book' },
  { path: 'public/images/tree-of-knowledge.png', id: 'dyansampada/images/tree-of-knowledge' },
]

const urls = {}
for (const f of files) {
  process.stdout.write(`Uploading ${f.path}... `)
  const r = await uploadFile(f.path, f.id)
  if (r.secure_url) {
    urls[f.path] = r.secure_url
    console.log('✓')
  } else {
    console.log('FAIL:', JSON.stringify(r).slice(0, 120))
  }
}

console.log('\n=== ALL CLOUDINARY URLs ===')
for (const [k, v] of Object.entries(urls)) console.log(`${k} → ${v}`)
