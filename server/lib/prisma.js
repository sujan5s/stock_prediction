const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

// Initialize the native PostgreSQL driver pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Create the Prisma PostgreSQL adapter
const adapter = new PrismaPg(pool);

// Initialize PrismaClient with the driver adapter
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
