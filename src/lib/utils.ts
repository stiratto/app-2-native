import { Dispatch, SetStateAction } from "react"
import { StorageFavoritesItem } from "../interfaces/interfaces"
import { Post, User } from "../interfaces/api.interfaces"

// Guarda un post o user como favorito, acepta un tipo generico Post | User.
export function saveFavorite<T extends Post | User>(setFavorites: Dispatch<SetStateAction<StorageFavoritesItem[]>>, item: T) {

  // el campo userid normalmente viene en un Post
  const type = "userId" in item ? "post" : "user"
  // si existe, remueve el favorito, si no existe, anade el favorito
  setFavorites(prev => {
    const exists = prev.filter((i) => i.type === type).find(u => u.data.id === item?.id)
    return exists ?
      prev.filter((i) => i.data.id !== item?.id)
      :
      [...prev, { type: type, data: item! }]
  })
}
