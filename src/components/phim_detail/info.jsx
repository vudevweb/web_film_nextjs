/* eslint-disable @next/next/no-img-element */
'use client';
import Link from "next/link";
const info = (data) => {
     
     const movie = data.data.movie;
     const episodes = data.data.episodes;

     return (
          <div className="card">
               <div className="card-body row">
                    <div className="col-3">
                         <div>
                              <img
                                   src={movie.poster_url}
                                   width="100%"
                                   alt={movie.name}
                                   className="rounded-2"
                                   style={{ objectFit: "cover" }}
                              />
                         </div>
                    </div>
                    <div className="col-9">
                         <div>
                              <ul className="nav nav-tabs nav-justified mb-3" id="ex1" role="tablist">
                                   <li className="nav-item" role="presentation">
                                        <a className="nav-link active text-warning fw" id="ex3-tab-1" data-bs-toggle="tab" href="#ex3-tabs-1" role="tab" aria-controls="ex3-tabs-1" aria-selected="true">Thông tin</a>
                                   </li>
                                   <li className="nav-item" role="presentation">
                                        <a className="nav-link text-warning fw" id="ex3-tab-2" data-bs-toggle="tab" href="#ex3-tabs-2" role="tab" aria-controls="ex3-tabs-2" aria-selected="false">Nội dung phim</a>
                                   </li>
                                   <li className="nav-item" role="presentation">
                                        <a className="nav-link text-warning fw" id="ex3-tab-3" data-bs-toggle="tab" href="#ex3-tabs-3" role="tab" aria-controls="ex3-tabs-3" aria-selected="false">Các tập phim</a>
                                   </li>
                              </ul>
                              <div className="tab-content" id="ex2-content">
                                   <div className="tab-pane fade show active" id="ex3-tabs-1" role="tabpanel" aria-labelledby="ex3-tab-1">
                                        <div className="row p-3">
                                             <ul className="text-warning col-6">
                                                  <li><p><strong>Tên phim : </strong>{movie.name}</p></li>
                                                  <li><p><strong>Tên chính thức : </strong>{movie.origin_name}</p></li>
                                                  <li><p><strong>Trạng thái : </strong>{movie.episode_current}</p></li>
                                                  <li><p><strong>Tổng số tập : </strong>{movie.episode_total}</p></li>
                                                  <li><p><strong>Chất Lượng : </strong>{movie.quality}</p></li>
                                             </ul>
                                             <ul className="text-warning col-6">
                                                  <li><p><strong>Ngôn Ngữ : </strong>{movie.lang}</p></li>
                                                  <li><p><strong>Đạo diễn : </strong>{movie.director.join(",")}</p></li>
                                                  <li><p><strong>Diễn viên : </strong>{movie.actor.join(", ")}</p></li>
                                                  <li><p><strong>Thời lượng : </strong>{movie.time}</p></li>
                                                  <li><p><strong>Ngày tạo : </strong>{new Date(movie.created.time).toLocaleDateString()}</p></li>
                                             </ul>
                                        </div>
                                        <div>
                                             {episodes.map((episode, index) => (
                                                  <div key={index} className="text-center mt-3">
                                                       {episode.server_data.slice(0, 1).map((ep, i) => (
                                                            <Link key={i} href={`/xem-phim/${movie.slug}/${ep.slug}?server=${encodeURIComponent(episode.server_name)}`} className="btn btn-warning me-3">
                                                                 Xem ngay
                                                            </Link>
                                                       ))}
                                                       <Link href={movie.trailer_url} target="_blank" className="btn btn-danger me-3" >Xem trailer</Link>
                                                       <button onClick={() => alert('Đang làm!')} target="_blank" className="btn btn-success" >Lấy API</button>
                                                  </div>
                                             ))}
                                        </div>
                                   </div>
                                   <div className="tab-pane fade" id="ex3-tabs-2" role="tabpanel" aria-labelledby="ex3-tab-2">
                                        <div className="p-3">
                                             <p className="text-warning">{movie.content}</p>
                                        </div>
                                   </div>
                                   <div className="tab-pane fade" id="ex3-tabs-3" role="tabpanel" aria-labelledby="ex3-tab-3">
                                        <div className="p-3">
                                             {episodes.map((episode, index) => (
                                                  <div key={index}>
                                                       <div className="text-warning"><strong>Server: </strong>{episode.server_name}</div>
                                                       {episode.server_data.map((ep, i) => (
                                                            <Link key={i} href={`/xem-phim/${movie.slug}/${ep.slug}?server=${encodeURIComponent(episode.server_name)}`} className="btn btn-secondary btn-sm mt-2 me-2">
                                                                 {ep.name}
                                                            </Link>
                                                       ))}
                                                  </div>
                                             ))}
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default info;