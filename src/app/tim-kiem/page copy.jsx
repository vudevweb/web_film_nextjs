"use client";
import Movie from "@/components/template/movie";
import { useState, useEffect } from "react";

const Page = () => {
  const [movies, setMovies] = useState([]);
  const [img, setImg] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const search = async (keyword) => {
    setLoading(true);
    const api = "https://phimapi.com/v1/api/tim-kiem?keyword=";
    const getSearch = await fetch(`${api}${keyword}&limit=12`);
    const search = await getSearch.json();
    setMovies(search.data.items);
    setImg(search.data.APP_DOMAIN_CDN_IMAGE);
    if (search.data.items.length > 0) setLoading(false);
  };
  const HandleSearch = (e) => {
    setKeyword(e.target.value);
    setTimeout(() => {
      search(e.target.value);
    }, 1000);
  };

  return (
    <div>
      <div className="mb-5">
        <h3 className="text-warning">Nội dung tìm kiếm: {keyword}</h3>
      </div>
      <div className="mb-5">
        <input type="search" onChange={HandleSearch} className="form-control" />
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Movie movies={movies} domain={img} />
      )}
    </div>
  );
};

export default Page;
