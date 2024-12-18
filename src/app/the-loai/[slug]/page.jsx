import CardMovie from "@/components/template/cardMovie";
const TheLoai = async ({ params, searchParams }) => {
  const api = process.env.API_CT_THE_LOAI;
  const slug = params.slug;
  const page = searchParams.page || 1;
  const res = await fetch(`${api + slug}?page=${page}`);
  const data = await res.json();
  const movies = data.data.items;
  const urlImage = data.data.APP_DOMAIN_CDN_IMAGE;
  const seoOnPage = data.data.seoOnPage;
  const pagination = data.data.params.pagination;
  const totalPages = pagination.totalPages;
  const baseUrl = data.data.breadCrumb[0].slug;
  return (
    <>
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
