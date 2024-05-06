'use client';
import CardMovie from '@/components/template/cardMovie';
import { useCallback, useEffect, useState } from "react";
function DanhMuc({ params, searchParams }) {
     console.log("re-render");
     const slug = params.slug;

     const urlApi = "https://phimapi.com/v1/api/danh-sach/"
     const [urlImage, setUrlImage] = useState("null");
     const [movies, setMovies] = useState([]);
     const [title, setTitle] = useState(null);
     const [page, setPage] = useState(1);
     const [status, setStatus] = useState('Xem thêm');
     const [loading, setLoading] = useState(true);

     const getMovies = useCallback(async () => {
          const res = await fetch(`${urlApi+slug}?page=${page}`);
          const data = await res.json();
          const movieGet = data.data.items;
          const getSeo = data.data.seoOnPage;
          setMovies([...movies, ...movieGet]);
          setTitle(data.data.seoOnPage.title);
          setUrlImage(data.data.APP_DOMAIN_CDN_IMAGE)
          document.title = `${getSeo.titleHead} - vudevweb.com`;
          setPage(page + 1);
          setStatus('Xem thêm');
          setLoading(false);
     }, [page, slug]);


     useEffect(() => {
          getMovies();
          return () => {
               setMovies([]);
               setPage(1);
          }
     }, [slug]);


     const handleRender = useCallback(() => {
          setStatus(`Đang tải thêm...`);
          getMovies();
     }, [movies]);

     if (loading) {
          return (
               <div className="loading_vd">
                    <div className="spinner-border text-warning" role="status">
                         <span className="visually-hidden">Loading...</span>
                    </div>
               </div>
          );
     }
     return (
          <div className="">
                    <CardMovie movies={movies} domain={urlImage}/>
                    <div className='mt-4 text-center'>
                         <button className='btn btn-warning' onClick={handleRender}> {status} </button>
                    </div>
          </div>
     );
}

export default DanhMuc;