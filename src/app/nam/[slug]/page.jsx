import CardMovie from "@/components/template/CardMovie";
import BreadCrumb from "@/components/template/BreadCrumb";

export async function generateMetadata({ params }) {
  const api = process.env.API_CT_QUOC_GIA;
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

const fetchMoviesByYear = async (api, slug, page) => {
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

const NamPhatHanh = async ({ params, searchParams }) => {
  const api = process.env.API_NAM_PHAT_HANH;
  const slug = params.slug;
  const page = parseInt(searchParams.page || 1, 10);
  const data = await fetchMoviesByYear(api, slug, page);
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

export default NamPhatHanh;
