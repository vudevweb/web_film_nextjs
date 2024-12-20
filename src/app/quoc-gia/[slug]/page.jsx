import CardMovie from "@/components/template/cardMovie";
import BreadCrumb from "@/components/template/BreadCrumb";
const fetchMoviesByCountry = async (api, slug, page) => {
  if (!api) {
    console.error("API endpoint is not defined.");
    return null;
  }

  try {
    const res = await fetch(`${api + slug}?page=${page}`);
    if (!res.ok) throw new Error(`Failed to fetch data for slug: ${slug}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching movies by country:", error);
    return null;
  }
};

const TheLoai = async ({ params, searchParams }) => {
  const api = process.env.API_CT_QUOC_GIA;
  const slug = params.slug;
  const page = parseInt(searchParams.page || 1, 10);
  const data = await fetchMoviesByCountry(api, slug, page);

  if (!data) {
    return <div>Error loading data. Please try again later.</div>;
  }

  const {
    items: movies = [],
    APP_DOMAIN_CDN_IMAGE: urlImage = "",
    breadCrumb = [],
    params: { pagination: { totalPages = 1 } = {} } = {},
  } = data;

  const baseUrl = breadCrumb?.[0]?.slug || "/";

  return (
    <>
      <BreadCrumb breadCrumbs={breadCrumb} />
      <CardMovie
        movies={movies}
        domain={urlImage}
        totalPages={totalPages}
        slug={slug}
        page={page}
        baseUrl={baseUrl}
      />
    </>
  );
};

export default TheLoai;
