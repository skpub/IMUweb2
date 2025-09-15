import type { NextConfig } from "next"

const requiredEnv = [
  "DB_PORT",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "ADMIN_UUID",
  "ADMIN_USERNAME",
  "ID_TOKEN_PUBKEY_PATH",
  "JWT_SECRET",
  "IMUWEB_ORIGIN",
]

requiredEnv.forEach((key: string) => {
  if (!process.env[key]) {
    throw new Error(`env ${key} is required.`)
  }
})

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    TESTTEST: "testtest",
  },
}

export default nextConfig
