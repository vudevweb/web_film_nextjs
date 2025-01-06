import DanhMucPhim from "@/components/template/danhMuc";
import Noti from "@/components/page/home/noti";

const API_BASE = "https://phimapi.com";
const API_V1_BASE = `${API_BASE}/v1/api/danh-sach`;

const fetchMovies = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${url}`);
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return null; 
  }
};

const Home = async () => {
  const endpoints = {
    newMovies: `${API_BASE}/danh-sach/phim-moi-cap-nhat?page=1`,
    phimLe: `${API_V1_BASE}/phim-le`,
    phimBo: `${API_V1_BASE}/phim-bo`,
    phimHoatHinh: `${API_V1_BASE}/hoat-hinh`,
    tvShow: `${API_V1_BASE}/tv-shows`,
  };

  const [newMovies, phimLe, phimBo, phimHoatHinh, tvShow] = await Promise.all([
    fetchMovies(endpoints.newMovies),
    fetchMovies(endpoints.phimLe),
    fetchMovies(endpoints.phimBo),
    fetchMovies(endpoints.phimHoatHinh),
    fetchMovies(endpoints.tvShow),
  ]);

  const urlImage = tvShow?.data?.APP_DOMAIN_CDN_IMAGE || "";

  const categories = [
    { data: newMovies?.items, title: "PHIM MỚI NHẤT", domain: "" },
    { data: phimLe?.data?.items, title: "PHIM LẺ", domain: urlImage },
    { data: phimBo?.data?.items, title: "PHIM BỘ", domain: urlImage },
    {
      data: phimHoatHinh?.data?.items,
      title: "PHIM HOẠT HÌNH",
      domain: urlImage,
    },
    { data: tvShow?.data?.items, title: "TV SHOW", domain: urlImage },
  ];

  return (
    <div>
      {/* <Noti /> */}
      {categories.map(
        (category, index) =>
          category.data && (
            <DanhMucPhim
              key={index}
              movies={category.data}
              domain={category.domain}
              categoryTitle={category.title}
            />
          )
      )}
    </div>
  );
};

export default Home;
