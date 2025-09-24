import { render } from '@testing-library/react-native';
import PostCard from "../src/components/PostCard"
import { Post } from '../src/interfaces/interfaces';
import { NavigationContainer } from '@react-navigation/native';
import { FavoritesContextProvider } from '../src/contexts/FavoritesContext';

describe('<PostCard />', () => {
  test('Texto se renderiza correctamente en PostCard', () => {
    const mockPost: Post = {
      title: 'mock post 1',
      id: 1,
      body: "contenido del mock post 1",
      userId: 2
    }
    const { getByText } = render(<NavigationContainer>
      <FavoritesContextProvider>
        <PostCard post={mockPost} />
      </FavoritesContextProvider>

    </NavigationContainer>);

    getByText('mock post 1');
  });
});


