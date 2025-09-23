import { type NewPingResult, ping } from "minecraft-protocol"

export async function getMotd(): Promise<NewPingResult> {
  const host = "localhost"
  const port = 25565
  const result = await ping({
    host: host,
    port: port,
  })

  return result as NewPingResult
}
