// MoviePlayer.js (Client Component)
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Comment from "./comment";
const VideoPlayer = ({ episode }) => {
  if (!episode) {
    return (
      <div className="text-warning fadeIn text-center">
        Tập phim không tồn tại.
      </div>
    );
  }
  return (
    <div>
      <div className="text-warning fw mb-2 fadeIn">
        <strong>
          <i className="fe fe-hash"></i>
          {episode.name}
        </strong>
      </div>
      <iframe
        className="video-iframe rounded"
        title={episode.filename || "Video"}
        src={episode.link_embed}
        width="100%"
        height="500px"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const MoviePlayer = ({ initialData, params }) => {
  const searchParams = useSearchParams();
  const serverIndex = parseInt(searchParams.get("server")) || 0;
  const tapSlug = params.tap;

  const [movieData, setMovieData] = useState({
    movie: initialData?.movie || {},
    episodes: initialData?.episodes || [],
  });
  const [currentEpisode, setCurrentEpisode] = useState(null);

  useEffect(() => {
    if (movieData.episodes.length > 0) {
      const foundEpisode = movieData.episodes[serverIndex]?.server_data?.find(
        (item) => item.slug === tapSlug
      );
      setCurrentEpisode(foundEpisode);
    }
  }, [tapSlug, serverIndex, movieData.episodes]);

  const Breadcrumb = () => (
    <nav aria-label="breadcrumb text-start">
      <ol className="breadcrumb justify-content-start">
        <li className="breadcrumb-item">
          <Link href="/" className="text-warning fw">
            Trang chủ
          </Link>
        </li>
        <li className="breadcrumb-item">
          <Link
            href={`/phim/${movieData.movie.slug}`}
            className="text-warning fw"
          >
            {movieData.movie.name}
          </Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {currentEpisode?.name || "Tập phim"}
        </li>
      </ol>
    </nav>
  );

  const EpisodeList = () => (
    <div>
      {movieData.episodes.map((item, index) => (
        <div key={index} className="ps-3">
          <div className="text-warning mb-2">
            <strong>Server: </strong>
            {item.server_name}
          </div>
          {item.server_data.map((tapVip, i) => (
            <Link
              key={i}
              href={`/xem-phim/${movieData.movie.slug}/${tapVip.slug}?server=${index}`}
              className={`btn btn-secondary btn-sm me-3 mb-3 ${
                index === serverIndex && tapVip.slug === tapSlug
                  ? "btn-warning"
                  : ""
              }`}
            >
              {tapVip.name}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="card">
        <div className="card-header">
          <Breadcrumb />
        </div>
        <div className="card-body">
          <div className="mb-4">
            <VideoPlayer episode={currentEpisode} />
          </div>

          <hr />

          <div className="mb-4">
            <div className="text-warning fw mb-2">
              <strong>
                <i className="fe fe-hash"></i>Các tập phim
              </strong>
            </div>
            <EpisodeList />
          </div>

          <hr />

          <div className="mb-4">
            <div className="text-warning fw mb-2">
              <strong>
                <i className="fe fe-hash"></i>Bình luận
              </strong>
            </div>
            <Comment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePlayer;