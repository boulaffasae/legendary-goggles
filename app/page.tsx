type Post = {
  id: number;
  title: string;
};

export default async function Page() {
  let data = await fetch('https://api.vercel.app/blog')
  let posts: Post[] = await data.json();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}