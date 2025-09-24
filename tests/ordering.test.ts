import { Post } from "../src/interfaces/api.interfaces";

const mockPosts: Post[] = [
  {
    id: 1,
    body: "mock body of a mock posts, this post will be mocked and mocked against mocked",
    title: "mOcK PoSt 1",
    userId: 40
  },
  {
    id: 2,
    body: "another mock body, just for testing purposes",
    title: "Second Mock Post",
    userId: 41
  },
  {
    id: 3,
    body: "yet another mock post body to simulate real data",
    title: "Third Mock Post",
    userId: 42
  },
];

const filterPosts = (posts: Post[], searchTitle: string) => {

  return posts.filter((post: any) => post.title.toLowerCase().includes(searchTitle.toLowerCase()))

}

describe('ordering posts', () => {
  test('posts length deberia ser mayor que 0', () => {
    expect(filterPosts(mockPosts, "Mock Post 1").length).toBeGreaterThan(0)
  })

  test('primer resultado deberia ser third mock post', () => {
    expect(filterPosts(mockPosts, "third")[0].title).toBe("Third Mock Post")
  })
})



