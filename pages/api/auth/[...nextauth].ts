import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import nodemailer from 'nodemailer'
import { html, text } from '../../../utils/htmlEmail'

export default NextAuth({
    providers: [
        Providers.Email({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
            sendVerificationRequest: ({identifier: email, url, baseUrl, provider}) => {
                return new Promise((resolve, reject) => {
                    const {server, from} = provider
                    // Strip protocol from URL and use domain as site name
                    const site = baseUrl.replace(/^https?:\/\//, '')

                    console.log(site, 'site')
                    console.log(server, 'server')

                    nodemailer
                        .createTransport(server)
                        .sendMail({
                            to: email,
                            from,
                            subject: `Sign in to ${site}`,
                            text: text({url, site}),
                            html: html({url, site, email})
                        }, (error) => {
                            if (error) {
                                console.log(error)
                                // logger.error('SEND_VERIFICATION_EMAIL_ERROR', email, error)
                                // @ts-ignore
                                return reject(new Error('SEND_VERIFICATION_EMAIL_ERROR', error))
                            }
                            return resolve()
                        })
                })
            },
        }),
    ],
    database: process.env.DATABASE_URL,
    secret: process.env.SECRET,
    session: {
        jwt: true,
    },
    jwt: {},
    pages: {
        signIn: '/auth/signin',
        verifyRequest: '/auth/verify-request',
        error: '/auth/error',
        signOut: '/auth/signout',
        // newUser: null // If set, new users will be directed here on first sign in
    },
    callbacks: {
        // async signIn(user, account, profile) { return true },
        // async redirect(url, baseUrl) { return baseUrl },
        // async session(session, user) { return session },
        // async jwt(token, user, account, profile, isNewUser) { return token }
    },
    events: {},
    debug: true,
})
