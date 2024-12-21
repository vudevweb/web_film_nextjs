import CardMovie from "@/components/template/CardMovie";
import BreadCrumb from "@/components/template/BreadCrumb";
import SEO from "@/components/template/SEO";
const fetchMoviesByCategory = async (slug, page) => {
  const api =
    process.env.API_DANH_MUC || "https://phimapi.com/v1/api/danh-sach/";
  if (!slug) {
    console.error("Slug is not provided.");
    return null;
  }

  try {
    const res = await fetch(`${api + slug}?page=${page}`);
    if (!res.ok) throw new Error(`Failed to fetch data for slug: ${slug}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching movies by category:", error);
    return null;
  }
};

const DanhMuc = async ({ params, searchParams }) => {
  const slug = params.slug;
  const page = parseInt(searchParams.page || 1, 10);
  const data = await fetchMoviesByCategory(slug, page);
  if (!data) {
    return <div>Error loading data. Please try again later.</div>;
  }

  const {
    items: movies = [],
    APP_DOMAIN_CDN_IMAGE: urlImage = "",
    breadCrumb = [],
    seoOnPage,
    params: { pagination: { totalPages = 1 } = {} } = {},
  } = data;
  const baseUrl = breadCrumb?.[0]?.slug || "/";

  return (
    <>
      <SEO {...seoOnPage} />
      <BreadCrumb breadCrumbs={breadCrumb} />
      <CardMovie
        movies={movies || []}
        domain={urlImage || ""}
        totalPages={totalPages || 1}
        slug={slug}
        page={page}
        baseUrl={baseUrl}
      />
    </>
  );
};

export default DanhMuc;
