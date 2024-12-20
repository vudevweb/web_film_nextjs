import React from "react";
import Link from "next/link";

const BreadCrumb = ({ breadCrumbs = [] }) => {
  if (!breadCrumbs || breadCrumbs.length === 0) return null; // Không hiển thị nếu không có dữ liệu

  return (
    <nav aria-label="breadcrumb mb-3">
      <ol
        className="breadcrumb"
        style={{ justifyContent: "start", marginBottom: "10px" }}
      >
        {breadCrumbs.map((crumb, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${crumb.isCurrent ? "active" : ""}`}
            aria-current={crumb.isCurrent ? "page" : undefined}
          >
            {crumb.isCurrent || !crumb.slug ? (
              crumb.name
            ) : (
              <Link href={crumb.slug}>{crumb.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
