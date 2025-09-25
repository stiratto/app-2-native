import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStaticNavigation,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Users from '@/screens/Users';
import Posts from '@/screens/Posts';
import User from '@/screens/User';
import Post from '@/screens/Post';
import Favorites from '@/screens/Favorites';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';

// crea un stack para cada screen (requisito)
// cada stack tiene su propio internal data structure
const UsersStack = createNativeStackNavigator({
  screens: {
    Users: {
      screen: Users,
      options: {
        title: "Usuarios",
        headerShown: true,

      }

    },
    User: {
      screen: User,
      options: {
        title: "Usuario",
        headerShown: true,
      }
    }
  }
})

const FavoritesStack = createNativeStackNavigator({
  screens: {
    Favorites: {
      screen: Favorites,
      options: {
        title: "Favorites",
        headerShown: false,
      }
    }
  }
})


const PostsStack = createNativeStackNavigator({
  initialRouteName: "Posts",
  screens: {
    Posts: {
      screen: Posts,
      options: {
        title: "Posts",
        headerShown: true,
      }
    },
    Post: {
      screen: Post,

      options: {
        title: "Post",
        headerShown: true,
      }
    }
  }
})


const HomeTabs = createBottomTabNavigator({
  screens: {
    UsersStack: {
      screen: UsersStack,
      options: {
        title: 'Usuarios',
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <FontAwesome6
            name="person"
            size={24}
            color={color}
          />
        ),
      },
    },
    FavoritesStack: {
      screen: FavoritesStack,
      options: {
        title: "Favoritos",
        tabBarIcon: ({ color }) => (
          <AntDesign
            name="star"
            size={24}
            color={color}
          />
        ),

      }
    },
    PostsStack: {
      screen: PostsStack,

      options: {
        title: "Posts",
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <FontAwesome6 name="newspaper" size={24} color={color} />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: "Home",
        headerShown: false
      }
    },
  },

});

export const Navigation = createStaticNavigation(RootStack);


type UsersStackParamList = {
  Users: undefined;
  User: { userId: number };
};

type PostsStackParamList = {
  Posts: undefined;
  Post: { id: number }
};

type RootStackParamList = {
  HomeTabs: NavigatorScreenParams<{
    UsersStack: NavigatorScreenParams<UsersStackParamList>;
    PostsStack: NavigatorScreenParams<PostsStackParamList>;
  }>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
