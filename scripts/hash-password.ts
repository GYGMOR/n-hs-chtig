import bcrypt from 'bcryptjs'

const password = process.argv[2]
if (!password) {
  console.error('Usage: npm run admin:hash -- <dein-passwort>')
  process.exit(1)
}

const hash = await bcrypt.hash(password, 10)
console.log('\nPasswort-Hash (in .env.local einfügen):')
console.log(`ADMIN_PASSWORD_HASH="${hash}"`)
