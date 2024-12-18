/* eslint-disable @next/next/no-img-element */
import Info from "@/components/page/phim_detail/info";

const Phim = async ({ params }) => {
     const api = process.env.API_CT_PHIM;
     const slug = params.slug;
     console.log(slug);
     const res = await fetch(`${api + slug}`);
     const data = await res.json();
     console.log(data);
     
     return (
          <div>
               <Info data={data} />
          </div>
     )
}

export default Phim;
