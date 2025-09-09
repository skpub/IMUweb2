import fs from "fs";
import type { NextRequest } from "next/server";
import { type Plugin, readPlugins, writePlugins } from "../../../lib/plugins";

// Get the list of installed plugins
export async function GET() {
  const plugins = readPlugins();
  return new Response(JSON.stringify(plugins), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

interface NewPlugin {
  projectName: string;
}

// Add a new plugin by specifying its Modrinth project name
export async function POST(req: NextRequest) {
  const plugin = (await req.json()) as NewPlugin;
  const plugins = readPlugins();

  // fetch version info from modrinth
  const newVersionInfoRes = await fetch(
    `https://api.modrinth.com/v2/project/${plugin.projectName}/version?loaders=["paper", "spigot", "purpur"]`,
    {
      cache: "no-store",
    },
  );
  const newVersionInfo = await newVersionInfoRes.json()

  const newPlugin: Plugin = {
    version: newVersionInfo[0].version_number,
  };

  const downloadUrl = newVersionInfo[0].files[0].url;
  const jarRes = await fetch(downloadUrl);
  const buffer = await jarRes.arrayBuffer();
  const outputFilename = process.env.MC_SERVER?.concat("/plugins/").concat(
    plugin.projectName.concat(".jar"),
  );
  if (!outputFilename) {
    return Response.json(
      { ok: false, error: "env MC_SERVER is not set" },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  fs.writeFileSync(outputFilename, Buffer.from(buffer))

  // update plugins.json
  plugins[plugin.projectName] = newPlugin
  writePlugins(plugins);

  return Response.json(plugins, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// Update all plugins
export async function PATCH() {
  const plugins = readPlugins();

  for (const [id, plugin] of Object.entries(plugins)) {
    const newVersionInfoRes = await fetch(
      `https://api.modrinth.com/v2/project/${id}/version?loaders=["paper", "spigot", "purpur"]`,
      {
        cache: "no-store",
      },
    );
    const newVersionInfo = await newVersionInfoRes.json()
    if (plugin.version !== newVersionInfo.version_number) {
      const jarRes = await fetch(newVersionInfo.files[0].url)
      const buffer = await jarRes.arrayBuffer();
      const outputFilename = process.env.MC_SERVER?.concat("/plugins/").concat(
        id.concat(".jar"),
      );
      if (!outputFilename) {
        return Response.json(
          { ok: false, error: "env MC_SERVER is not set" },
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      fs.writeFileSync(outputFilename, Buffer.from(buffer));
      plugin.version = newVersionInfo.version_number;

      plugins[id] = plugin;
    }
  }
  writePlugins(plugins);

  return Response.json(plugins, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
