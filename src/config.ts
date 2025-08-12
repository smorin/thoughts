import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

// Load environment variables
dotenv.config()

export type ConfigFile = {
  thoughts?: {
    thoughtsRepo: string
    reposDir: string
    globalDir: string
    user: string
    repoMappings: Record<string, string>
  }
}

export class ConfigResolver {
  public configFile: ConfigFile
  private configFilePath: string

  constructor(options: { configFile?: string } = {}) {
    this.configFile = this.loadConfigFile(options.configFile)
    this.configFilePath = this.getConfigFilePath(options.configFile)
  }

  private loadConfigFile(configFile?: string): ConfigFile {
    if (configFile) {
      const configContent = fs.readFileSync(configFile, 'utf8')
      return JSON.parse(configContent)
    }

    // Look for config files in standard locations
    const configPaths = ['thoughts.json', getDefaultConfigPath()]

    for (const configPath of configPaths) {
      try {
        if (fs.existsSync(configPath)) {
          const configContent = fs.readFileSync(configPath, 'utf8')
          return JSON.parse(configContent)
        }
      } catch (error) {
        console.error(chalk.yellow(`Warning: Could not parse config file ${configPath}: ${error}`))
      }
    }

    return {}
  }

  private getConfigFilePath(configFile?: string): string {
    if (configFile) return configFile

    const configPaths = ['thoughts.json', getDefaultConfigPath()]
    for (const configPath of configPaths) {
      try {
        if (fs.existsSync(configPath)) {
          return configPath
        }
      } catch {
        // Continue to next path
      }
    }
    return getDefaultConfigPath() // fallback
  }
}

export function loadConfigFile(configFile?: string): ConfigFile {
  const resolver = new ConfigResolver({ configFile })
  return resolver.configFile
}

export function saveConfigFile(config: ConfigFile, configFile?: string): void {
  const configPath = configFile || getDefaultConfigPath()

  console.log(chalk.yellow(`Writing config to ${configPath}`))

  // Create directory if it doesn't exist
  const configDir = path.dirname(configPath)
  fs.mkdirSync(configDir, { recursive: true })

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2))

  console.log(chalk.green('Config saved successfully'))
}

export function getDefaultConfigPath(): string {
  const homeDir = process.env.HOME || ''
  return path.join(homeDir, '.thoughts', 'config.json')
}