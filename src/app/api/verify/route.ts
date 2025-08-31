import { credentials } from "@grpc/grpc-js";
import { IdTokenProviderClient } from "../../../../generate/IDTokenProvider_grpc_pb";
import { NextRequest, NextResponse } from "next/server";
import { UserCode } from "../../../../generate/IDTokenProvider_pb";

const client = new IdTokenProviderClient("localhost:50051", credentials.createInsecure());

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  return new Promise<NextResponse>((resolve) => {
    const userCode = new UserCode()
    userCode.setCode(code)

    client.getToken(userCode, (err, response) => {
      console.log(err)
      console.log(response)
      if (err || !response.getId()) {
        resolve(NextResponse.json({ ok: false }, { status: 400 }))
      }
      else {
        resolve(NextResponse.json({ ok: true }))
      }
    })
  })
}
