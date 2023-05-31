import { generateToken } from './generate-token.js'
import { prisma } from './prisma.js'
import { faker } from '@faker-js/faker'
import { hash } from 'argon2'
import asyncHandler from 'express-async-handler'
import { userField } from './utils/user.utils.js'

export const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  
	const { email, password } = req.body

	const isHaveUser = await prisma.user.findUnique({
		where: {
			email,
		},
	})

	if (isHaveUser) {
		res.status(400)
		throw new Error('User already exist')
	}

	const user = await prisma.user.create({
		data: {
			email,
			name: faker.name.fullName(),
			password: await hash(password),
		},
    select: userField,
	})

	const token = generateToken(user.id)
	res.json({user, token})
})

export const authUser = asyncHandler(async (req, res) => {
	
	res.json('d')
})
