"use client";
import Movie from "@/components/template/movie";
import { useState, useEffect } from "react";

const Page = () => {
  const [movies, setMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [img, setImg] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    if (keyword.trim()) {
      const timer = setTimeout(() => {
        search(keyword);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setMovies([]);
      setDisplayedMovies([]);
      setAlert("");
    }
  }, [keyword]);

  const search = async (keyword) => {
    setLoading(true);
    try {
      const api = `https://phimapi.com/v1/api/tim-kiem?keyword=`;
      const response = await fetch(`${api}${keyword}`);
      const searchResults = await response.json();

      if (searchResults.data.items.length > 0) {
        setMovies(searchResults.data.items);
        setDisplayedMovies(searchResults.data.items.slice(0, ITEMS_PER_PAGE));
        setImg(searchResults.data.APP_DOMAIN_CDN_IMAGE);
        setAlert("");
      } else {
        setMovies([]);
        setDisplayedMovies([]);
        setAlert("Không tìm thấy phim");
      }
    } catch (error) {
      setAlert("Có lỗi xảy ra khi tìm kiếm");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = nextPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
    const nextMovies = movies.slice(0, startIndex + ITEMS_PER_PAGE);

    setDisplayedMovies(nextMovies);
    setCurrentPage(nextPage);
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="mb-5">
        <h3 className="text-warning">Nội dung tìm kiếm &quot;{keyword}&quot;</h3>
      </div>
      <div className="mb-5">
        <input
          type="search"
          onChange={handleSearchChange}
          style={{
            borderRadius: "20px",
            padding: "20px 20px",
          }}
          className="form-control"
          placeholder="Nhập tên phim bạn muốn tìm...."
        />
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : alert ? (
        <div className="text-center text-warning">{alert}</div>
      ) : (
        <div className="">
          <Movie movies={displayedMovies} domain={img} />
          {displayedMovies.length < movies.length && (
            <div className="text-center mt-5">
              <button
                onClick={handleLoadMore}
                className="btn btn-warning"
                style={{
                  borderRadius: "20px",
                  padding: "10px 20px",
                  fontSize: "16px",
                }}
              >
                Xem thêm
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
