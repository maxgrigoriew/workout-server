import { prisma } from '../prisma.js'
import { userField } from '../utils/user.utils.js'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

export const protect = asyncHandler(async (req, res, next) => {
	let token

	if (req.headers.authorization?.startWith('Beare')) {
		token = req.header.authorixation.split(' ')[1]

		const decoder = jwt.verify(token, process.env.JWT_SECRET)

		const userFound = await prisma.user.findUnique({
			where: {
				id: decoder.userId,
			},
			select: userField,
		})

		if (userFound) {
			req.user = userFound
			next()
		} else {
			res.status(401)
			throw new Error('Not authorization, token faled')
		}

		if (!token) {
			res.status(401)
			throw new Error('Not authorization, I don have a  faled')
		}
	}
})
