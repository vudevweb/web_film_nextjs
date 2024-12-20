/* eslint-disable @next/next/no-img-element */
import Info from "@/components/page/phim_detail/info";

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
  console.log(data);

  if (!data) {
    return <div>Lỗi khi lấy dữ liệu phim. Vui lòng thử lại sau.</div>;
  }

  return (
    <div>
      <Info data={data} />
    </div>
  );
};

export default Phim;
