import { generateToken } from './generate-token.js'
import { prisma } from '../prisma.js'
import { userField } from '../utils/user.utils.js'
import { faker } from '@faker-js/faker'
import { hash, verify } from 'argon2'
import asyncHandler from 'express-async-handler'

export const registerUser = asyncHandler(async (req, res) => {
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
	res.json({ user, token })
})

export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

  const user = await prisma.user.findUnique({
    where: {
      email
    },
    })

  const isValidPassword = await verify(user.password, password)

  if(user.password && isValidPassword) {
    const token = generateToken(user.id)
    res.json({user, token})
  } else {
    res.status(401) 
      throw new Error('Email and password are not corerct')
    
  }

	res.json(user)
})
