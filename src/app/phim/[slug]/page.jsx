/* eslint-disable @next/next/no-img-element */
import Info from "@/components/phim_detail/info";


const Phim = async ({ params }) => {
     const api = "https://phimapi.com/phim/";
     const slug = params.slug;
     const res = await fetch(`${api + slug}`);
     const data = await res.json();

     return (
          <div>
               <Info data={data} />
          </div>
     )
}

export default Phim;
