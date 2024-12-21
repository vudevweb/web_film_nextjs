import CardMovie from "@/components/template/CardMovie";
import BreadCrumb from "@/components/template/BreadCrumb";

export async function generateMetadata({ params }) {
  const api = process.env.API_DANH_SACH;
  const post = await fetch(`${api}/${params.slug}`);
  const data = await post.json();
  const seoOnPage = data.data.seoOnPage;
  return {
    title: seoOnPage.titleHead,
    description: seoOnPage.descriptionHead,
    og_type: seoOnPage.og_type,
    og_image: seoOnPage.og_image[0],
    og_url: seoOnPage.og_url,
  };
}

const fetchMoviesByCategory = async (slug, page) => {
  const api = process.env.API_DANH_SACH;
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
