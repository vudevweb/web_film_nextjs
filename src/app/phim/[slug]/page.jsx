/* eslint-disable @next/next/no-img-element */
import Info from "@/components/page/phim_detail/info";

export async function generateMetadata({ params }) {
  const api = process.env.API_CT_PHIM;
  const post = await fetch(`${api}/${params.slug}`);
  const data = await post.json();
  return {
    og_type: "video.movie",
    title: data.movie.name,
    description: data.movie.content,
    og_image: [data.movie.poster_url],
    og_url: `/phim/${params.slug}`,
  };
}

const fetchMovieDetails = async (api, slug) => {
  if (!api) {
    console.error("API endpoint is not defined.");
    return null;
  }

  try {
    const res = await fetch(`${api + slug}`);
    if (!res.ok) throw new Error(`Failed to fetch data for slug: ${slug}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

const Phim = async ({ params }) => {
  const api = process.env.API_CT_PHIM;
  const slug = params.slug;
  const data = await fetchMovieDetails(api, slug);

  if (!data) {
    return <div>Lỗi khi lấy dữ liệu phim. Vui lòng thử lại sau.</div>;
  }

  return (
    <>
      <Info data={data} />
    </>
  );
};

export default Phim;
