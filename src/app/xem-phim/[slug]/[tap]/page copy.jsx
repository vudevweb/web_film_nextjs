"use client";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Comment from "./components/comment";

const XemPhim = ({ params }) => {
  const urlApi = "https://phimapi.com/phim/";
  const searchParams = useSearchParams();
  const serverIndex = parseInt(searchParams.get("server")) || 0;
  const tapSlug = params.tap;
  const slug = params.slug;

  const [movieData, setMovieData] = useState({
    movie: {},
    episodes: [],
    currentEpisode: null,
  });
  const [loading, setLoading] = useState(true);

  const getMovieData = useCallback(async () => {
    try {
      const res = await fetch(`${urlApi}${slug}`);
      if (!res.ok) throw new Error("Failed to fetch movie data");
      const data = await res.json();

      const episodesData = data.episodes || [];
      const currentServer = episodesData[serverIndex];
      const foundEpisode = currentServer?.server_data?.find(
        (item) => item.slug === tapSlug
      );

      setMovieData({
        movie: data.movie || {},
        episodes: episodesData,
        currentEpisode: foundEpisode || null,
      });
    } catch (error) {
      console.error("Error fetching movie data:", error);
    } finally {
      setLoading(false);
    }
  }, [slug, tapSlug, serverIndex]);

  useEffect(() => {
    getMovieData();
  }, [getMovieData]);

  if (loading) {
    return (
      <div className="loading_vd">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!movieData.currentEpisode) {
    return <div className="text-warning">Tập phim không tồn tại.</div>;
  }

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
          {movieData.currentEpisode.name}
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
            <div className="text-warning fw mb-2">
              <strong>
                <i className="fe fe-hash"></i>
                {movieData.currentEpisode.name}
              </strong>
            </div>
            <div>
              <iframe
                className="video-iframe rounded"
                title={movieData.currentEpisode.filename || "Video"}
                src={movieData.currentEpisode.link_embed}
                width="100%"
                height="500px"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
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

export default XemPhim;
