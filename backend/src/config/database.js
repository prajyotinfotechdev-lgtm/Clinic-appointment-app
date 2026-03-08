const { PrismaClient } = require('@prisma/client');

/**
 * Singleton PrismaClient instance.
 *
 * In development, hot-reload (nodemon) can spawn multiple PrismaClient
 * instances. Storing the client on `globalThis` prevents this.
 * In production this is a no-op since the process restarts cleanly.
 */
const globalForPrisma = globalThis;

const prisma =
    globalForPrisma.__prisma ||
    new PrismaClient({
        log:
            process.env.NODE_ENV === 'development'
                ? ['error', 'warn']
                : ['error'],
    });

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.__prisma = prisma;
}

module.exports = prisma;
