import Record from "@/components/record"
import { verifyJWT } from "@/lib/jwt"
import { getMotd } from "@/lib/motd"
import styles from "./page.module.css"

type LoginState =
  | { state: "error" }
  | { state: "ordinary"; userId: string; userName: string }
  | { state: "owner" }

export default async function Minecraft() {
  const res = await verifyJWT()
  let loginState: LoginState
  switch (res.state) {
    case "error":
    case "new":
      loginState = { state: "error" }
      break
    case "continue":
      if (res.currentToken.sub === "c5567453-d31a-4e0a-96d1-81b97422b561") {
        loginState = { state: "owner" }
      } else {
        loginState = {
          state: "ordinary",
          userId: res.currentToken.sub as string,
          userName: res.currentToken.mc_name as string,
        }
      }
  }

  const serverInfo = new Map<string, string>()
  const serverStatus = await getMotd()
  serverInfo.set("バージョン", serverStatus.version.name)
  serverInfo.set(
    "プレイヤー",
    `${serverStatus.players.online} / ${serverStatus.players.max}`,
  )

  return (
    <div className={styles.container}>
      <h1>マイクラサーバの状態</h1>
      <Record relation={serverInfo} />
    </div>
  )
}
