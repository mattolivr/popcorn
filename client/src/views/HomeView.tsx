import Card from "../components/card/Card";
import Post from "../components/post/Post";
import UserInput from "../components/ui/UserInput";
import { type Post as PostType } from "../entites/pop.post";

export default function HomeView(): JSX.Element {
  const post: PostType = {
    id: "1",
    media: [
      "https://source.unsplash.com/random/1",
      "https://source.unsplash.com/random/2",
      "https://source.unsplash.com/random/3",
    ],
    stats: {
      likes: 24,
      comments: 2,
      shares: 1,
    },
  };

  return (
    <div className="my-2 flex h-fit w-full flex-col gap-2 px-3 sm:px-2 md:w-3/4 lg:w-7/12 xl:w-5/12 2xl:w-2/5">
      {/* <Highlights /> */}
      <Card>
        <UserInput />
      </Card>
      <Post post={post} />
    </div>
  );
}

// function Highlights(): JSX.Element {
//   const [data, setData] = useState<CarouselItem[]>();

//   useEffect(() => {
//     function getMedia(response: AxiosResponse<any, any>): void {
//       setData(
//         response.data?.results
//           ?.map((result: any) => {
//             const media: Media = "title" in result ? new Movie(result) : new TVShow(result);
//             return {
//               key: media.id,
//               title: media.getTitle(),
//               background: `https://image.tmdb.org/t/p/original/${media.backdrop_path}`,
//               link: `/${media.isMovie() ? "movies" : "shows"}/${media.id}`,
//             };
//           })
//           .filter((_media: Media, index: number) => {
//             return index < 6;
//           }) as CarouselItem[],
//       );
//     }
//     if (data == null) {
//       get("trending/all/day", getMedia);
//     }
//   });

//   return <Carousel data={data} />;
// }
