export type ControlMethod = 'TCP' | 'UDP'

export interface Command {
  name: string
  command: string
}

export interface Device {
  id: string
  name: string
  controlMethod: ControlMethod
  commands: Command[]
  port: number
}

export interface IPAddress {
  id: string,
  ipAddress: string
}

export interface Port {
  id: string,
  port: number
}

export type OmitID<T> = Omit<T, 'id'>