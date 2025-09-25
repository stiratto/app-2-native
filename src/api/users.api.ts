import { User } from "@/interfaces/api.interfaces"

const USERS_API = {
  getUser: async (id: number): Promise<User> => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      const data = await res.json()
      return data
    } catch (err: any) {
      throw err
    }
  },


  getUsers: async (): Promise<User[]> => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users")
      if (!res.ok) {
        throw new Error("Error.")
      }
      const data = await res.json()
      return data
    } catch (err: any) {
      throw err
    }
  }

}

export default USERS_API
