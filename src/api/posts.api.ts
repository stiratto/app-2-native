import { Post } from "@/interfaces/api.interfaces"

const POSTS_API = {
  getPost: async (id: number): Promise<Post> => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      if (!res.ok) {
        throw new Error("Mal status code de response de posts/")
      }
      const data = await res.json()
      return data
    } catch (err: any) {
      throw err
    }
  },

  getUserPosts: async (userId: number) => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)

      const data = await res.json()
      return data
    } catch (err: any) {
      throw new Error(err)
    }
  }
}
export default POSTS_API
