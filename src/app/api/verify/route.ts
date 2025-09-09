import { credentials } from "@grpc/grpc-js";
import * as jose from "jose";
import { type NextRequest, NextResponse } from "next/server";
import { IdTokenProviderClient } from "../../../../generate/IDTokenProvider_grpc_pb";
import { UserCode } from "../../../../generate/IDTokenProvider_pb";

const client = new IdTokenProviderClient(
  "localhost:50051",
  credentials.createInsecure(),
);

// マイクラサーバにワンタイムコードを渡すとIDトークンが発行される(gRPC)。
// このAPIはIDトークンを検証できた場合にアクセストークンを発行してクライアントのCookieにセットする。

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  return new Promise<NextResponse>((resolve) => {
    const userCode = new UserCode();
    userCode.setCode(code);

    client.getToken(userCode, (err, resGetToken) => {
      if (err || !resGetToken.getId()) {
        resolve(NextResponse.json({ ok: false }, { status: 400 }));
      } else {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const idTokenStr = new TextDecoder().decode(
          resGetToken.getId()! as Uint8Array<ArrayBufferLike>,
        );
        const idToken = jose.decodeJwt(idTokenStr);

        // generate access token and set cookie.
        const token = new jose.SignJWT({
          sub: idToken.sub,
          userName: idToken["mc_name"],
        })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("1h")
          .sign(secret);

        token.then((t) => {
          const res = NextResponse.json({ ok: true });
          res.cookies.set("token", t, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
          });
          resolve(res);
        });
      }
    });
  });
}
