"use client";
import Movie from "@/components/template/movie";
import { useState, useEffect } from "react";
import { Pagination } from "antd";
const Page = () => {
  const [movies, setMovies] = useState([]);
  const [img, setImg] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [alert, setAlert] = useState("");
  const [domain_img, setDomain_img] = useState("");

  useEffect(() => {
    if (keyword.trim()) {
      const timer = setTimeout(() => {
        search(keyword);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setMovies([]);
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
        setImg(searchResults.data.APP_DOMAIN_CDN_IMAGE);        
        // setTotalPages(searchResults.paginate.total_page);
        setAlert("");
      } else {
        setMovies([]);
        setAlert("Không tìm thấy phim");
      }
    } catch (error) {
      setAlert("Có lỗi xảy ra khi tìm kiếm");
    } finally {
      setLoading(false);
    }
  };

  const HandleSearch = (e) => {
    setKeyword(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    search(keyword);
  };

  return (
    <div>
      <div className="mb-5">
        <h3 className="text-warning">Nội dung tìm kiếm: {keyword}</h3>
      </div>
      <div className="mb-5">
        <input
          type="search"
          onChange={HandleSearch}
          style={{
            borderRadius: "20px",
            padding: "20px 20px",
          }}
          className="form-control"
          placeholder="Nhập tên phim bạn muốn tìm...."
        />
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : alert ? (
        <div className="text-center text-warning">{alert}</div>
      ) : (
        <Movie movies={movies} domain={img} />
      )}

      {/* {totalPages > 1 && (
        <div className="mt-5 text-center">
          <Pagination
            style={{ color: "white" }}
            defaultCurrent={currentPage}
            total={totalPages}
            current={currentPage}
            onChange={handlePageChange}
          />
        </div>
      )} */}
    </div>
  );
};

export default Page;
