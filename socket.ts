import Constants from 'expo-constants'

interface TCPEvents {
  data: ((data: any) => void)[]
}

interface UDPEvents {
  listening: (() => void)[]
}

export class MockTcp {
  events: TCPEvents = {
    data: [],
  }

  connect(options: any, callback: () => void): MockTcp {
    console.log('Configured mock client with: ', options)

    // Mock connecting
    setTimeout(() => {
      // Connected
      callback()
    }, 500)
    return this
  }
  write(command: string) {
    console.log('Sending command: ', command)
    this.events.data.forEach((fn) => fn(`Echo: ${command}`))
  }
  destroy() {
    console.log('Socket destroyed')
  }
  on(event: keyof TCPEvents, callback: () => void) {
    this.events[event].push(callback)
  }
}

export class MockUdp {
  events: UDPEvents = {
    listening: [],
  }

  createSocket(options: { type: string }): MockUdp {
    console.log('Created socket with options: ', options)
    return this
  }

  bind() {
    console.log('Binding socket')

    setTimeout(() => {
      console.log('Socket bound')
      this.events.listening.forEach((fn) => fn())
    }, 500)
  }
  close() {
    console.log('Closing socket')
  }
  send(
    command: string,
    _offset: undefined,
    _length: undefined,
    port: number,
    ipAddress: string,
    callback: () => void
  ) {
    console.log(`Sending command "${command}" to ${ipAddress}:${port}`)

    setTimeout(callback, 200)
  }
  once(event: keyof UDPEvents, callback: () => void) {
    this.events[event].push(callback)
  }
}

const mockTcp = {
  Socket: MockTcp,
}

const mockUdp = new MockUdp()

const socket = {
  tcp:
    Constants.appOwnership === 'expo'
      ? mockTcp
      : require('react-native-tcp-socket'),
  udp:
    Constants.appOwnership === 'expo' ? mockUdp : require('react-native-udp'),
}

export default socket
