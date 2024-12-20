"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import style from "./header.module.css";

const AppHeader = () => {
  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const navbar = document.querySelector(".navbar");

      if (navbar) {
        navbar.style.top =
          scrollTop > lastScrollTop
            ? "-100px"
            : scrollTop < 20
            ? "0"
            : navbar.style.top;
      }

      lastScrollTop = scrollTop;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const API_THE_LOAI = process.env.API_THE_LOAI;
  const API_QUOC_GIA = process.env.API_QUOC_GIA;

  const [theLoai, setTheLoai] = useState([]);
  const [quocGia, setQuocGia] = useState([]);
  const [namPhatHanh, setNamPhatHanh] = useState(() => {
    const years = [];
    for (let i = 2024; i >= 1990; i--) {
      years.push({ name: i, slug: i });
    }
    return years;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [theLoaiRes, quocGiaRes] = await Promise.all([
          fetch(API_THE_LOAI).then((res) => res.json()),
          fetch(API_QUOC_GIA).then((res) => res.json()),
        ]);

        setTheLoai(theLoaiRes);
        setQuocGia(quocGiaRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [API_THE_LOAI, API_QUOC_GIA]);

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{ transition: "0.3s ease-in-out" }}
    >
      <div className="container">
        <Link className="navbar-brand me-auto text-warning fw" href="/">
          VUDO
        </Link>
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5
              className="offcanvas-title text-warning fw"
              id="offcanvasNavbarLabel"
            >
              Vudo
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
              <li className="nav-item ">
                <Link
                  className={`nav-link nav-link-vd mx-lg-2 fw`}
                  aria-current="page"
                  href="/"
                >
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link nav-link-vd  mx-lg-2"
                  href="/danh-sach/phim-le"
                >
                  Phim Lẻ
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link nav-link-vd mx-lg-2"
                  href="/danh-sach/phim-bo"
                >
                  Phim bộ
                </Link>
              </li>
              {/* <li className="nav-item">
                                        <Link className="nav-link nav-link-vd mx-lg-2" href="/danh-muc/phim-dang-chieu">Phim đang chiếu</Link>
                                   </li> */}
              <li className="nav-item">
                <Link
                  className="nav-link nav-link-vd mx-lg-2"
                  href="/danh-sach/hoat-hinh"
                >
                  Hoạt hình
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link nav-link-vd mx-lg-2"
                  href="/danh-sach/tv-shows"
                >
                  TV Show
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link mx-lg-2 dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Thể loại
                </Link>
                <ul className="dropdown-menu menu_vd">
                  {theLoai.map((item, index) => (
                    <li key={index}>
                      <Link
                        className="dropdown-item"
                        href={`/the-loai/${item.slug}`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link  mx-lg-2 dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Quốc gia
                </Link>
                <ul className="dropdown-menu menu_vd">
                  {quocGia.map((item, index) => (
                    <li key={index}>
                      <Link
                        className="dropdown-item"
                        href={`/quoc-gia/${item.slug}`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link  mx-lg-2 dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Năm
                </Link>
                <ul className="dropdown-menu menu_vd">
                  {namPhatHanh.map((item, index) => (
                    <li key={index}>
                      <Link
                        className="dropdown-item"
                        href={`/nam-phat-hanh/${item.slug}`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <Link href="/tim-kiem" className="ms-2 me-md-4 text-dark">
            <i className="fe fe-search fs-3" />
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </div>
    </nav>
  );
};
export default AppHeader;
