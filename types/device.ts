export type ControlMethod = 'TCP' | 'UDP'

export interface Command {
  name: string
  command: string
}

export interface Device {
  id: number
  name: string
  controlMethod: ControlMethod
  commands: Command[]
  port: number
}
