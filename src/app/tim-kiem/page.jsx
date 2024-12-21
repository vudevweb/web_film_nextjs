"use client";
import Movie from "@/components/template/movie";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keywordGet = searchParams.get("keyword") || "";

  const [movies, setMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [img, setImg] = useState("");
  const [keyword, setKeyword] = useState(keywordGet);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // Use debouncing for keyword search
  const debouncedKeyword = useDebounce(keyword, 500);

  const search = useCallback(async (keyword) => {
    if (!keyword.trim()) return; // Avoid search if keyword is empty or just spaces

    setLoading(true);
    setAlert(""); // Reset alert on new search
    try {
      const api = process.env.API_TIM_KIEM;
      const response = await fetch(`${api}?keyword=${keyword}`);
      const searchResults = await response.json();

      if (searchResults.data.items.length > 0) {
        setMovies(searchResults.data.items);
        setDisplayedMovies(searchResults.data.items.slice(0, ITEMS_PER_PAGE));
        setImg(searchResults.data.APP_DOMAIN_CDN_IMAGE);
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
  }, []);

  useEffect(() => {
    if (debouncedKeyword) {
      search(debouncedKeyword);
    } else {
      setMovies([]);
      setDisplayedMovies([]);
      setAlert("");
    }
  }, [debouncedKeyword, search]);

  const handleSearchChange = (e) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);

    // Use router.push to update the URL with the new keyword
    router.push(`/tim-kiem?keyword=${newKeyword}`);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = nextPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
    const nextMovies = movies.slice(0, startIndex + ITEMS_PER_PAGE);
    setDisplayedMovies(nextMovies);
    setCurrentPage(nextPage);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="mb-5">
        <h3 className="text-warning">
          Nội dung tìm kiếm &quot;{keyword}&quot;
        </h3>
      </div>
      <div className="mb-5">
        <input
          type="search"
          onChange={handleSearchChange}
          className="form-control"
          placeholder="Nhập tên phim bạn muốn tìm...."
          value={keyword}
          style={{
            borderRadius: "20px",
            padding: "20px 20px",
          }}
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
        <div>
          <Movie movies={displayedMovies} domain={img} />
          {displayedMovies.length < movies.length && (
            <div className="text-center my-5">
              <button onClick={handleLoadMore} className="catalog__more">
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
