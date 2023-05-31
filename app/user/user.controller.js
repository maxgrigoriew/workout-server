
import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { userField } from '../utils/user.utils.js'

export const getUserProfile = asyncHandler(async (req, res) => {
	const user  = await prisma.user.findUnique({
    where: {
      id: 1
    },
    select: userField
  })

	res.json(user)
})