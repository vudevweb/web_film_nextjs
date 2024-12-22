/* eslint-disable @next/next/no-img-element */
import Info from "@/components/page/phim_detail/info";

const API_ENDPOINT = process.env.API_CT_PHIM;

const fetchMovieDetails = async (api, slug) => {
  if (!api) {
    console.error("API endpoint is not defined.");
    return null;
  }

  try {
    const response = await fetch(`${api}/${slug}`);
    if (!response.ok) {
      console.error(
        `Failed to fetch data for slug: ${slug} (status: ${response.status})`
      );
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

export async function generateMetadata({ params }) {
  if (!API_ENDPOINT) {
    console.error("API endpoint is not defined.");
    return {};
  }

  try {
    const data = await fetchMovieDetails(API_ENDPOINT, params.slug);
    if (!data || !data.movie) {
      console.error("Failed to generate metadata: movie data is missing.");
      return {};
    }

    return {
      og_type: "video.movie",
      title: data.movie.name || "Unknown Movie",
      description: data.movie.content || "No description available.",
      og_image: [data.movie.poster_url || "/default-poster.jpg"],
      og_url: `/phim/${params.slug}`,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {};
  }
}

const Phim = async ({ params }) => {
  if (!API_ENDPOINT) {
    console.error("API endpoint is not defined.");
    return <div>API endpoint is missing. Please check your configuration.</div>;
  }

  const data = await fetchMovieDetails(API_ENDPOINT, params.slug);

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
