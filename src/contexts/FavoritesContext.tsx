import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { StorageFavoritesItem } from "../interfaces/interfaces";
import { storage } from "../navigation";

// Este contexto se utiliza para manejar el estado de favoritos de
// manera mas facil, para tener un mejor manejo de la UI debido a que
// si usaramos algo como AsyncStorage o MMKV, esas librerias no
// manejan reactividad, un Context es seguro y rapido.

interface TFavoritesContext {
  favorites: StorageFavoritesItem[],
  setFavorites: Dispatch<SetStateAction<StorageFavoritesItem[]>>
}

export const FavoritesContext = createContext<TFavoritesContext | null>(null)

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error("FavoritesContext debe ser usado dentro de un FavoritesContext.Provider")
  }
  return context
}

export const FavoritesContextProvider = ({ children }: { children: React.ReactNode }) => {
  // seteamos esta initializer function para iniciar la app con los
  // datos ya populados
  const [favorites, setFavorites] = useState<StorageFavoritesItem[]>(() => {
    return JSON.parse(storage.getString("favorites") ?? "[]")
  })

  // cuando cambien el estado de favorites, actualizamos el estado
  // persistente (mmkv)
  useEffect(() => {
    storage.set('favorites', JSON.stringify(favorites))
  }, [favorites])

  return <FavoritesContext.Provider value={{ favorites, setFavorites }}>{children}</FavoritesContext.Provider>

}
