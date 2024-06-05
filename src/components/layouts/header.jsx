'use client';
import React from 'react';
import Link from 'next/link';
import style from './header.module.css';
import { useState, useEffect } from 'react';

const AppHeader = () => {
     const API_THE_LOAI = process.env.API_THE_LOAI;
     const API_QUOC_GIA = process.env.API_QUOC_GIA;
     const API_NAM = process.env.API_NAM;

     const [theLoai, setTheLoai] = useState([]);
     const [quocGia, setQuocGia] = useState([]);
     const [namPhatHanh, setNamPhatHanh] = useState([]);

     useEffect(() => {
          const getTheLoai = async () => {
               const res = await fetch(API_THE_LOAI);
               const data = await res.json();
               // console.log(data);
               setTheLoai(data);
          };

          const getQuocGia = async () => {
               const res = await fetch(API_QUOC_GIA);
               const data = await res.json();
               // console.log(data);
               setQuocGia(data);
          };

          const getNamPhatHanh = async () => {
               // const res = await fetch(API_NAM);
               // const data = await res.json();
               for (let i = 2024; i >= 1990; i--) {
                    setNamPhatHanh((prev) => [...prev, { name: i, slug: i }]);
               }
               // console.log(data);
               // setNamPhatHanh(data);
          }

          getQuocGia();
          getNamPhatHanh();
          getTheLoai();

     }, []);

     return (  
          <nav className="navbar navbar-expand-lg fixed-top">
               <div className="container">
                    <Link className="navbar-brand me-auto text-warning fw" href="/">Vudo</Link>
                    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                         <div className="offcanvas-header">
                              <h5 className="offcanvas-title text-warning fw" id="offcanvasNavbarLabel">Vudo</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                         </div>
                         <div className="offcanvas-body">
                              <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                                   <li className="nav-item">
                                        <Link className={`nav-link nav-link-vd  mx-lg-2 fw`} aria-current="page" href="/">Trang chủ</Link>
                                   </li>
                                   <li className="nav-item">
                                        <Link className="nav-link nav-link-vd  mx-lg-2" href="/danh-sach/phim-le">Phim Lẻ</Link>
                                   </li>
                                   <li className="nav-item">
                                        <Link className="nav-link nav-link-vd mx-lg-2" href="/danh-sach/phim-bo">Phim bộ</Link>
                                   </li>
                                   {/* <li className="nav-item">
                                        <Link className="nav-link nav-link-vd mx-lg-2" href="/danh-muc/phim-dang-chieu">Phim đang chiếu</Link>
                                   </li> */}
                                   <li className="nav-item">
                                        <Link className="nav-link nav-link-vd mx-lg-2" href="/danh-sach/hoat-hinh">Hoạt hình</Link>
                                   </li>
                                   <li className="nav-item">
                                        <Link className="nav-link nav-link-vd mx-lg-2" href="/danh-sach/tv-shows">TV Show</Link>
                                   </li>
                                   <li className="nav-item dropdown">
                                        <a className="nav-link nav-link-vd  mx-lg-2 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                             Thể loại
                                        </a>
                                        <ul className="dropdown-menu menu_vd">
                                             {theLoai.map((item, index) => (
                                                  <li key={index}><Link className="dropdown-item" href={`/the-loai/${item.slug}`}>{item.name}</Link></li>
                                             ))}
                                        </ul>
                                   </li>
                                   <li className="nav-item dropdown">
                                        <a className="nav-link nav-link-vd mx-lg-2 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                             Quốc gia
                                        </a>
                                        <ul className="dropdown-menu menu_vd">
                                             {quocGia.map((item, index) => (
                                                  <li key={index}><Link className="dropdown-item" href={`/quoc-gia/${item.slug}`}>{item.name}</Link></li>
                                             ))}
                                        </ul>
                                   </li>
                                   <li className="nav-item dropdown">
                                        <a className="nav-link nav-link-vd mx-lg-2 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                             Năm
                                        </a>
                                        <ul className="dropdown-menu menu_vd">
                                             {namPhatHanh.map((item, index) => (
                                                  <li key={index}><Link className="dropdown-item" href={`/nam-phat-hanh/${item.slug}`}>{item.name}</Link></li>
                                             ))}
                                        </ul>
                                   </li>
                              </ul>
                         </div>
                    </div>

                    <div className="d-flex align-items-center">
                         <a href="#" className="ms-2 me-md-4 text-dark" data-bs-toggle="collapse" data-bs-target="#tim_kiem" aria-expanded="false" aria-controls="tim_kiem">
                              <i className="fe fe-search fs-3" />
                         </a>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                         <span className="navbar-toggler-icon"/>
                    </button>
               </div>
          </nav>

     );
};
export default AppHeader;