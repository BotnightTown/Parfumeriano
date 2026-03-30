import { PrismaMssql } from "@prisma/adapter-mssql";
import { PrismaClient } from "../generated/prisma";

const config = {
  server: "localhost",
  port: 1433,
  database: process.env.DB_NAME!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter: new PrismaMssql(config) });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
