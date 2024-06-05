import CardMovie from '@/components/template/cardMovie';

const TheLoai = async({ params, searchParams }) => {
     const api = process.env.API_CT_QUOC_GIA;
     const slug = params.slug;
     const page = searchParams.page || 1;

     // console.log(`${api + slug}`);

     const res = await fetch(`${api + slug}?page=${page}`);
     const data = await res.json();
     // console.log(data.data);
     const movies = data.data.items;
     // console.log(movies);
     const urlImage = data.data.APP_DOMAIN_CDN_IMAGE
     const seoOnPage = data.data.seoOnPage;
     const pagination = data.data.params.pagination;
     const totalPages = data.data.params.pagination.totalPages;
     console.log(totalPages);
     const baseUrl = data.data.breadCrumb[0].slug;

     return (
          <CardMovie movies={movies} domain={urlImage} totalPages={totalPages} slug={slug} page={page} baseUrl={baseUrl}/>
     );
}

export default TheLoai