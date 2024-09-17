import app from './app.js'
import { connectDB } from './db.js'
import dotenv from 'dotenv';

dotenv.config()
const port = process.env.PORT ?? 3000
const host = process.env.HOST || '0.0.0.0'; // Escuchar en todas las interfaces

connectDB()
app.listen(port, host,  () => {
    console.log(`Server is running at http://${host}:${port}`)
})
