

"use client"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import ReactPlayer from 'react-player'

import Comment from "./comment";
function XemPhim({ params }) {
     const urlApi = "https://phimapi.com/phim/";
     const searchParams = useSearchParams();
     const tap = params.tap;
     const server = searchParams.get('server');
     const [slug, setSlug] = useState(params.slug);
     const [movie, setMovie] = useState([]);
     const [episodes, setEpisodes] = useState([]);
     const [currentTap, setCurrentTap] = useState(null);
     const [tapPhim, setTapPhim] = useState(null);
     const [loading, setLoading] = useState(true);

     const getMovie = useCallback(async () => {
          try {
               const res = await fetch(`${urlApi}${slug}`);
               const data = await res.json();
               setMovie(data.movie);
               setEpisodes(data.episodes);
               const episode = data.episodes.find(item => item.server_name === server);
               if (episode) {
                    const foundTap = episode.server_data.find(item => item.slug === tap);
                    if (foundTap) {
                         setCurrentTap(foundTap.name);
                         setTapPhim(foundTap);
                    }
               }
          } catch (error) {
               console.error("Error fetching data: ", error);
          } finally {
               setLoading(false);
          }
     }, [slug, tap, server]);

     useEffect(() => {
          getMovie();
     }, [slug, tap]);

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
          <div>
               <div className="card">
                    <div className="card-header">
                         <nav aria-label="breadcrumb text-start">
                              <ol className="breadcrumb justify-content-start">
                                   <li className="breadcrumb-item"><a href="/" className="text-warning fw">Trang chủ</a></li>
                                   <li className="breadcrumb-item"><Link href={`/phim/${movie.slug}`} className="text-warning fw">{movie.name}</Link></li>
                                   <li className="breadcrumb-item active" aria-current="page">{currentTap}</li>
                              </ol>
                         </nav>
                    </div>
                    <div className="card-body">
                         <div className="mb-4">
                              <div className="text-warning fw mb-2">
                                   <strong><i className="fe fe-hash"></i>{currentTap}</strong>
                              </div>
                              <div>
                                   <ReactPlayer
                                        url={tapPhim.link_m3u8}
                                        width="100%" height="500px" 
                                        autoPlay={true} controls={true}
                                        preload="auto" playsinline={true} pip={true} 
                                        light={tapPhim.poster_url}
                                        onError={(e) => alert('Lỗi tải video! Xin lỗi bạn!', e)}
                                        config={{
                                             file: {
                                                  attributes: {
                                                       controlsList: 'nodownload', 
                                                  },
                                             },
                                             localStorage: true,
                                        }}

                                   />
                                   {/* <iframe src={tapPhim.link_embed} width="100%" height="500" frameborder="0"></iframe> */}
                              </div>
                         </div>

                         <hr />

                         <div className="mb-4">
                              <div className="text-warning fw mb-2">
                                   <strong><i className="fe fe-hash"></i>Các tập phim</strong>
                              </div>
                              <div>
                                   {episodes.map((item, index) => (
                                        <div key={index} className="ps-3">
                                             <div className="text-warning mb-2"> <strong>Server: </strong>{item.server_name}</div>
                                             {item.server_data.map((tapVip, i) => (
                                                  <Link
                                                       key={i}
                                                       href={`/xem-phim/${movie.slug}/${tapVip.slug}?server=${encodeURIComponent(item.server_name)}`}
                                                       className={`btn btn-secondary btn-sm me-3 mb-3 ${item.server_name === server && tapVip.slug === tap ? 'btn btn-warning' : ''}`}
                                                  >
                                                       {tapVip.name}
                                                  </Link>
                                             ))}
                                        </div>
                                   ))}

                              </div>
                         </div>

                         <hr />

                         <div className="mb-4">
                              <div className="text-warning fw mb-2">
                                   <strong><i className="fe fe-hash"></i>Bình luận</strong>
                              </div>
                              <Comment />
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default XemPhim;