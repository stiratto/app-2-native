import { Post, StorageFavoritesItem, User } from "../interfaces/interfaces"
import { storage } from "../navigation"

// metodos duplicados, quiza se pueda mejorar?
export const savePostFavorite = async (post: Post) => {
  const oldFavorites: StorageFavoritesItem[] = JSON.parse(storage.getString('favorites') ?? "[]")
  const favoritePosts = oldFavorites.filter((i) => i.type === "post")
  const alreadyIsFavorite = favoritePosts?.find((p) => p.data.id === post.id)
  if (alreadyIsFavorite) {
    return
  }

  const newFavorites = [...oldFavorites, { data: post, type: "post" }]
  storage.set('favorites', JSON.stringify(newFavorites))
}

export const saveUserFavorite = async (user: User) => {
  const oldFavorites: StorageFavoritesItem[] = JSON.parse(storage.getString('favorites') ?? "[]")
  console.log(oldFavorites)
  const favoriteUsers = oldFavorites.filter((i) => i.type === "user")
  const alreadyIsFavorite = favoriteUsers?.find((u) => u.data.id === user.id)
  if (alreadyIsFavorite) {
    return
  }

  const newFavorites = [...oldFavorites, { data: user, type: "user" }]
  storage.set('favorites', JSON.stringify(newFavorites))
}

export const isFavorite = (item: Post | User, type: "post" | "user") => {
  const favorites: StorageFavoritesItem[] = JSON.parse(storage.getString('favorites') ?? "[]")
  const favoriteItemsSameType = favorites.filter((i) => i.type === type)
  const isFavorite = favoriteItemsSameType.filter((fav) => fav.type === type).some((fav) => fav.data.id === item.id && fav.type === type)

  return isFavorite
}
