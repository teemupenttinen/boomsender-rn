import Constants from 'expo-constants'

interface Events {
  data: ((data: any) => void)[]
}

export class MockClient {
  events: Events = {
    data: [],
  }
  constructor() {}

  connect(options: any, callback: () => void): MockClient {
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
  on(event: keyof Events, callback: () => void) {
    this.events[event].push(callback)
  }
}

const mockTcp = {
  createConnection: (options: any, callback: () => void): MockClient => {
    const client = new MockClient()
    return client.connect(options, callback)
  },
}

const tcp =
  Constants.appOwnership === 'expo'
    ? mockTcp
    : require('react-native-tcp-socket')

export default tcp
