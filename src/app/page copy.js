/* eslint-disable @next/next/no-img-element */
'use client';

import DanhMucPhim from "@/components/template/danhMuc";

import { useState, useEffect, useCallback } from "react";

export default function Home() {
  console.log("re-render");
  const apiPhimMoi = "https://phimapi.com/danh-sach";
  const apiUrl = "https://phimapi.com/v1/api/danh-sach";

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    newMovie: [],
    phimLe: [],
    phimBo: [],
    phimHoatHinh: [],
    tvShow: [],
    urlImage: "",
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    const requests = [
      fetch(`${apiPhimMoi}/phim-moi-cap-nhat?page=1`),
      fetch(`${apiUrl}/phim-le`),
      fetch(`${apiUrl}/phim-bo`),
      fetch(`${apiUrl}/hoat-hinh`),
      fetch(`${apiUrl}/tv-shows`),
    ];

    const responses = await Promise.all(requests);
    const data = await Promise.all(responses.map(res => res.json()));
    const urlImage = data[1].data.APP_DOMAIN_CDN_IMAGE;

    setData({
      newMovie: data[0].items,
      phimLe: data[1].data.items,
      phimBo: data[2].data.items,
      phimHoatHinh: data[3].data.items,
      tvShow: data[4].data.items,
      urlImage: urlImage,
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


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
      {/* PHIM MỚI NHẤT */}
      <DanhMucPhim movies={data.newMovie} domain="" categoryTitle="PHIM MỚI NHẤT" />

      {/* PHIM LẺ */}
      <DanhMucPhim movies={data.phimLe} domain={data.urlImage} categoryTitle="PHIM LẺ" />

      {/* PHIM BỘ */}
      <DanhMucPhim movies={data.phimBo} domain={data.urlImage} categoryTitle="PHIM BỘ" />

      {/* PHIM HOẠT HÌNH */}
      <DanhMucPhim movies={data.phimHoatHinh} domain={data.urlImage} categoryTitle="PHIM HOẠT HÌNH" />

      {/* TV SHOW */}
      <DanhMucPhim movies={data.tvShow} domain={data.urlImage} categoryTitle="TV SHOW" />
    </div>
  );
}
