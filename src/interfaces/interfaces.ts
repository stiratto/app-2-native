// muchas interfaces no relacionadas, seria ideal separar en varios
// archivos basado en relacion

import { Post, User } from "./api.interfaces";


export interface StorageFavoritesItem {
  type: "post" | "user",
  data: Post | User,
}

