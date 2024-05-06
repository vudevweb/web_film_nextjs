
import CardMovie from '@/components/template/cardMovie';

const DanhMuc = async ({ params, searchParams }) => {
     const slug = params.slug;
     const page = searchParams.page || 1;
     const api = "https://phimapi.com/v1/api/danh-sach/"
     const res = await fetch(`${api + slug}?page=${page}`);
     const data = await res.json();
     const movies = data.data.items;
     const urlImage = data.data.APP_DOMAIN_CDN_IMAGE
     const seoOnPage = data.data.seoOnPage;
     const pagination = data.data.params.pagination;
     const totalPages = pagination.totalPages;
     return (
          <CardMovie movies={movies} domain={urlImage} totalPages={totalPages} slug={slug} page={page}/>
     );
}

export default DanhMuc;