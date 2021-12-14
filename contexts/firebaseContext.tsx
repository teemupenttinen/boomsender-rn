import { initializeApp } from '@firebase/app'
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  User,
} from '@firebase/auth'
import {
  getDatabase,
  push,
  remove,
  ref,
  onValue,
  update,
} from '@firebase/database'
import React, { useContext, useEffect, useState } from 'react'

const firebaseConfig = {
  apiKey: 'AIzaSyCBl56bcB0jQAurhjVFqkC9y3alu2iIlag',
  authDomain: 'boomsender-74865.firebaseapp.com',
  projectId: 'boomsender-74865',
  storageBucket: 'boomsender-74865.appspot.com',
  databaseURL:
    'https://boomsender-74865-default-rtdb.europe-west1.firebasedatabase.app',
  messagingSenderId: '549769501512',
  appId: '1:549769501512:web:8bcc8da16ed0d54b16717d',
}

interface FirebaseContextValues {
  user: User | undefined
  getData: () => Promise<Record<string, unknown>>
  addItem: (key: string, value: any) => Promise<string>
  updateItem: (key: string, id: string, value: any) => void
  deleteItem: (key: string, id: string) => void
  createDynamicLink: (url: string) => Promise<{shortLink: string}>
}

export const DEEPLINK_PREFIX = 'https://teemupenttinen.com/?link='

const FirebaseContext = React.createContext<FirebaseContextValues>({
  user: undefined,
  getData: async () => ({}),
  addItem: async () => '',
  updateItem: async () => '',
  deleteItem: async () => {},
  createDynamicLink: async () => ({shortLink: ''}),
})

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const database = getDatabase(app)

export const FirebaseContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | undefined>()

  useEffect(() => {
    if (!user && app) {
      signInAnonymously(auth)
      onAuthStateChanged(auth, (fbUser) => {
        if (fbUser && !user) {
          setUser(fbUser)
        } else {
          setUser(undefined)
        }
      })
    }
  }, [user, app])

  const getData = async (): Promise<Record<string, unknown>> => {
    return new Promise((resolve) => {
      if (!user && database) {
        throw 'Database or user not initialized'
      }
      const itemsRef = ref(database, `${user?.uid}/`)
      onValue(itemsRef, (snapshot) => {
        resolve(snapshot.val())
      })
    })
  }

  const addItem = (key: string, value: any): Promise<string> => {
    return new Promise((resolve) => {
      if (!user && database) {
        throw 'Database or user not initialized'
      }
      push(ref(database, `${user?.uid}/${key}/`), value).then((value) => {
        if (!value.key) throw Error('Unable to get item key')
        resolve(value.key)
      })
    })
  }

  const updateItem = (key: string, id: string, value: any) => {
    if (!user && database) {
      throw 'Database or user not initialized'
    }
    update(ref(database, `${user?.uid}/${key}/${id}/`), value)
  }

  const deleteItem = async (key: string, id: string) => {
    remove(ref(database, `${user?.uid}/${key}/${id}`))
  }

  const createDynamicLink = async (
    url: string
  ): Promise<{ shortLink: string }> => {
    const body = {
      dynamicLinkInfo: {
        domainUriPrefix: 'https://boomsender.page.link',
        link: DEEPLINK_PREFIX + url,
        androidInfo: {
          androidPackageName: 'com.teemupenttinen.boomsenderrn',
        },
        iosInfo: {
          iosBundleId: 'com.teemupenttinen.boomsenderrn',
        },
      },
    }
    const rawResponse = await fetch(
      `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${firebaseConfig.apiKey}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    )
    return await rawResponse.json()
  }

  return (
    <FirebaseContext.Provider
      value={{
        user,
        getData,
        addItem,
        updateItem,
        deleteItem,
        createDynamicLink,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirebase = () => {
  return useContext(FirebaseContext)
}
