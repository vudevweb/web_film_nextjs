/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import { Pagination } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";

const MovieCard = React.memo(({ movie, domain }) => {
  const { slug, poster_url, name } = movie;

  return (
    <div className="col-6 col-sm-4 col-lg-3 col-xl-2 mb-3">
      <div className="card card_movie text-center bg-none mt-1">
        <Link href={`/phim/${slug}`} className="card__cover">
          <div className="">
            <Image
              loading="lazy"
              src={`${domain}/${poster_url}`}
              alt={`Poster of ${name}`}
              width={300}
              height={280}
              placeholder="blur"
              blurDataURL="https://lh5.googleusercontent.com/proxy/CGWXSjMMd2FLW31MkAwyyg6CTEa5JYhkmoqOjQOmJbdrIKICImHlALT85CBWNPzJ5WdaGavA6OBY9SSO7YMWaQ7om0jHPu8"
            />
          </div>
          <svg
            width={22}
            height={22}
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11 1C16.5228 1 21 5.47716 21 11C21 16.5228 16.5228 21 11 21C5.47716 21 1 16.5228 1 11C1 5.47716 5.47716 1 11 1Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.0501 11.4669C13.3211 12.2529 11.3371 13.5829 10.3221 14.0099C10.1601 14.0779 9.74711 14.2219 9.65811 14.2239C9.46911 14.2299 9.28711 14.1239 9.19911 13.9539C9.16511 13.8879 9.06511 13.4569 9.03311 13.2649C8.93811 12.6809 8.88911 11.7739 8.89011 10.8619C8.88911 9.90489 8.94211 8.95489 9.04811 8.37689C9.07611 8.22089 9.15811 7.86189 9.18211 7.80389C9.22711 7.69589 9.30911 7.61089 9.40811 7.55789C9.48411 7.51689 9.57111 7.49489 9.65811 7.49789C9.74711 7.49989 10.1091 7.62689 10.2331 7.67589C11.2111 8.05589 13.2801 9.43389 14.0401 10.2439C14.1081 10.3169 14.2951 10.5129 14.3261 10.5529C14.3971 10.6429 14.4321 10.7519 14.4321 10.8619C14.4321 10.9639 14.4011 11.0679 14.3371 11.1549C14.3041 11.1999 14.1131 11.3999 14.0501 11.4669Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <h3 className="card__title">
          <Link href={`/phim/${slug}`}>{name}</Link>
        </h3>
      </div>
    </div>
  );
});
MovieCard.displayName = "MovieCard";

const CardMovie = ({
  movies = [],
  domain = "",
  totalPages = 1,
  slug = "",
  page = 1,
  baseUrl = "/",
}) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(page);

  const handlePageChange = (newPage) => {
    if (newPage === currentPage) return;
    router.push(`${baseUrl}?page=${newPage}`);
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="row">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} domain={domain} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-5 text-center">
        <Pagination
          style={{ color: "white" }}
          defaultCurrent={1}
          total={1000}
          current={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

CardMovie.displayName = "CardMovie";
export default React.memo(CardMovie);
