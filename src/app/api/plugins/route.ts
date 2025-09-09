import fs from "fs"
import { type Plugin, readPlugins, writePlugins } from "../../../lib/plugins";
import { NextRequest } from "next/server";

// Get the list of installed plugins
export async function GET() {
  const plugins = readPlugins()
  return new Response(JSON.stringify(plugins), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}

interface NewPlugin {
  projectName: string
}

// Add a new plugin by specifying its Modrinth project name
export async function POST(req: NextRequest) {
  const plugin = (await req.json()) as NewPlugin
  const plugins = readPlugins()

  // fetch version info from modrinth
  const newVersionInfoRes = await fetch(`https://api.modrinth.com/v2/project/${plugin.projectName}/version`, {
    cache: 'no-store',
  })
  const newVersionInfo = await newVersionInfoRes.json()

  const newPlugin: Plugin = {
    version: newVersionInfo[0].version_number,
    filename: plugin.projectName.concat(".jar")
  }

  const downloadUrl = newVersionInfo[0].files[0].url
  const jarRes = await fetch(downloadUrl)
  const buffer = await jarRes.arrayBuffer()
  const outputFilename = process.env.MC_SERVER?.concat("/plugins/").concat(newPlugin.filename)
  if (!outputFilename) {
    return Response.json({ ok: false, error: "env MC_SERVER is not set" }, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
  fs.writeFileSync(outputFilename, Buffer.from(buffer))

  // update plugins.json
  plugins[newVersionInfo[0].id] = newPlugin
  writePlugins(plugins)

  return Response.json(plugins, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}

// Update all plugins
export async function PATCH() {
  const plugins = readPlugins()

  for (const [id, plugin] of Object.entries(plugins)) {
    const newVersionInfoRes = await fetch(`https://api.modrinth.com/v2/version/${id}`, {
      cache: 'no-store',
    })
    const newVersionInfo = await newVersionInfoRes.json()
    if (plugin.version !== newVersionInfo.version_number) {
      const jarRes = await fetch(newVersionInfo.files[0].url)
      const buffer = await jarRes.arrayBuffer()
      const outputFilename = process.env.MC_SERVER?.concat("/plugins/").concat(plugin.filename)
      if (!outputFilename) {
        return Response.json({ ok: false, error: "env MC_SERVER is not set" }, {
          status: 500,
          headers: { "Content-Type": "application/json" },
        })
      }
      fs.writeFileSync(outputFilename, Buffer.from(buffer))
      plugin.version = newVersionInfo.version_number

      plugins[id] = plugin
    }
  }
  writePlugins(plugins)

  return Response.json(plugins, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
