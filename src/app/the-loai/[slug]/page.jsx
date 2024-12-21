import CardMovie from "@/components/template/CardMovie";
import BreadCrumb from "@/components/template/BreadCrumb";
import SEO from "@/components/template/SEO";

const fetchMoviesByGenre = async (api, slug, page) => {
  try {
    const res = await fetch(`${api + slug}?page=${page}`);
    if (!res.ok) throw new Error(`Failed to fetch data for slug: ${slug}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return null;
  }
};

const TheLoai = async ({ params, searchParams }) => {
  const api = process.env.API_CT_THE_LOAI;
  const slug = params.slug;
  const page = searchParams.page || 1;

  const data = await fetchMoviesByGenre(api, slug, page);
  if (!data) return <div>Error loading data. Please try again later.</div>;

  const {
    items: movies,
    APP_DOMAIN_CDN_IMAGE: urlImage,
    seoOnPage,
    params: paginationParams,
    breadCrumb,
  } = data.data;
  const { totalPages } = paginationParams.pagination || {};
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

export default TheLoai;
