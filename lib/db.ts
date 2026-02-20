import { Pool } from "pg"

function getConnectionConfig():
  | { connectionString: string }
  | { host: string; port: number; database: string; user: string; password: string } {
  if (process.env.DATABASE_URL) {
    return { connectionString: process.env.DATABASE_URL }
  }
  const host = process.env.DB_HOST ?? "localhost"
  const port = parseInt(process.env.DB_PORT ?? "5432", 10)
  const database = process.env.DB_NAME ?? "budgetingapp"
  const user = process.env.DB_USER
  const password = process.env.DB_PASSWORD
  if (!user || !password) {
    throw new Error(
      "Database config: set DATABASE_URL or both DB_USER and DB_PASSWORD (and optionally DB_HOST, DB_PORT, DB_NAME)"
    )
  }
  return { host, port, database, user, password }
}

let poolInstance: Pool | null = null

function getPool(): Pool {
  if (!poolInstance) {
    poolInstance = new Pool(getConnectionConfig())
  }
  return poolInstance
}

export async function query<T = unknown>(
  text: string,
  params?: unknown[]
): Promise<{ rows: T[]; rowCount: number }> {
  const result = await getPool().query(text, params)
  return { rows: (result.rows as T[]) ?? [], rowCount: result.rowCount ?? 0 }
}

export function getPoolExport(): Pool {
  return getPool()
}
