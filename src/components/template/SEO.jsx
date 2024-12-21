import Head from "next/head";

export default function SEO({
  titleHead,
  descriptionHead,
  og_type,
  og_image,
  og_url,
}) {
  const image =
    "https://phimimg.com" + Array.isArray(og_image) && og_image.length > 0
      ? og_image[0]
      : "";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: titleHead,
    description: descriptionHead,
    image,
    datePublished: new Date().toISOString(),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 5,
      reviewCount: 239,
    },
  };

  return (
    <Head>
      <title>{titleHead}</title>
      <meta name="description" content={descriptionHead} />
      <meta property="og:title" content={titleHead} />
      <meta property="og:description" content={descriptionHead} />
      <meta property="og:type" content={og_type} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={og_url} />
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
}

SEO.defaultProps = {
  titleHead: "Phim mới cập nhật",
  descriptionHead: "Xem phim chất lượng cao mọi lúc mọi nơi.",
  og_type: "website",
  og_image: [
    "https://phimimg.com/upload/vod/20240729-1/5337508e1f1f7366405388ccb2a2e26b.jpg",
  ],
  og_url: "/phim-moi-cap-nhat",
};
