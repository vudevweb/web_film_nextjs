import Movie from "@/components/template/movie";

const Page = async ({searchParams}) => {
     const api = "https://phimapi.com/v1/api/tim-kiem?keyword=";
     const keyword = searchParams.keyword;

     const getSearch = await fetch(`${api}${keyword}&limit=12`);
     const search = await getSearch.json();
     const movies = search.data.items
     console.log(movies);

     return (
          <div>
               <div className="mb-5">
                    <h3 className="text-warning">Nội dung tìm kiếm: {keyword}</h3>
               </div>

               <Movie movies={movies} domain={search.data.APP_DOMAIN_CDN_IMAGE} />
          </div>
     );
};

     
export default Page;