import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'plugins.json')

export interface Plugin {
  version: string
  filename: string
}

export interface Plugins {
  [id: string]: Plugin
}

export function readPlugins(): Plugins {
  if (!fs.existsSync(DATA_FILE)) return {}
  const raw = fs.readFileSync(DATA_FILE, 'utf-8')
  return JSON.parse(raw) as Plugins
}

export function writePlugins(plugins: Plugins) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(plugins, null, 2), 'utf-8')
}
