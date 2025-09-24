import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStaticNavigation,
  NavigatorScreenParams,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';
import Users from './screens/Users';
import Posts from './screens/Posts';
import User from './screens/User';
import Post from './screens/Post';
import Favorites from './screens/Favorites';


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
    Users: {
      screen: UsersStack,
      options: {
        title: 'Usuarios',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Image
            source={newspaper}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Favorites: {
      screen: FavoritesStack,
      options: {
        title: "Favoritos"
      }
    },
    Posts: {
      screen: PostsStack,

      options: {
        title: "Posts",
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Image
            source={bell}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
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
    }
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
    Users: NavigatorScreenParams<UsersStackParamList>;
    Posts: NavigatorScreenParams<PostsStackParamList>;
  }>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
