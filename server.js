import authRoutes from './app/auth.routes.js'
import { prisma } from './app/prisma.js'
import 'colors'
import * as dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'

dotenv.config()

const app = express()

const main = async () => {
	// if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
	const PORT = process.env.PORT || 5000

	app.use(express.json())

	app.use('/api/auth', authRoutes)

	app.listen(PORT, console.log(`сервер запущен ${process.env.NODE_ENV}`))
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.log(e)
		await prisma.$disconnect()
		process.exit(1)
	})
