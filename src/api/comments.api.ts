import { IComment } from "@/interfaces/api.interfaces"

const COMMENTS_API = {
  getComments: async (id: number): Promise<IComment[]> => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      if (!res.ok) {
        throw new Error("Mal status code de response en posts/:id/comments")
      }
      const data = await res.json()
      return data
    } catch (err: any) {
      throw err
    }
  },
}

export default COMMENTS_API
