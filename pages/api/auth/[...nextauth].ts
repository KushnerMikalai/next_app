import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'
import Category from '../../../models/Category'

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Providers.GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ],
    database: process.env.DATABASE_URL,
    secret: process.env.SECRET,
    session: {
        jwt: true
    },
    jwt: {},
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error'
    },
    callbacks: {
        // async signIn(token, user, account) {},
        // async jwt(token, user, account, profile, isNewUser) {}
    },
    events: {
        async createUser(user) {
            await dbConnect()
            const userFromDB = await User.findById(user.id)
            const userId = userFromDB._id
            await Category.insertMany([
                {userId, name: 'home'},
                {userId, name: 'car'},
                {userId, name: 'food'},
                {userId, name: 'medicines'},
            ])
        },
    },
    debug: false
})
