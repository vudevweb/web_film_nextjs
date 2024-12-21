import CardMovie from "@/components/template/CardMovie";
import BreadCrumb from "@/components/template/BreadCrumb";

const fetchNewMovieUpdate = async (api, page) => {
  try {
    const res = await fetch(`${api}?page=${page}`);
    if (!res.ok) throw new Error(`Failed to fetch data`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return null;
  }
};

const TheLoai = async ({ searchParams }) => {
  const api = process.env.API_MOI_CAP_NHAT;
  const page = searchParams.page || 1;

  const data = await fetchNewMovieUpdate(api, page);
  data.breadCrumb = [
    {
      name: "Phim mới cập nhật",
      slug: "/phim-moi-cap-nhat",
      isCurrent: false,
      position: 2,
    },
    {
      name: "Trang " + page,
      isCurrent: true,
      position: 3,
    },
  ];
  if (!data) return <div>Error loading data. Please try again later.</div>;

  const { items: movies, pagination, breadCrumb } = data;

  const { totalPages } = pagination || {};
  const baseUrl = "phim-moi-cap-nhat" || "/";
  const urlImage = null;
  return (
    <>
      <BreadCrumb breadCrumbs={breadCrumb} />
      <CardMovie
        movies={movies || []}
        domain={urlImage || ""}
        totalPages={totalPages || 1}
        slug={"phim-moi-cap-nhat"}
        page={page}
        baseUrl={baseUrl}
      />
    </>
  );
};

export default TheLoai;
