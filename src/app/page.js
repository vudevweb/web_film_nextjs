import DanhMucPhim from "@/components/template/danhMuc";
import Noti from "@/components/page/home/noti";

const Home = async () => {
  const apiPhimMoi = "https://phimapi.com/danh-sach";
  const api = "https://phimapi.com/v1/api/danh-sach";

  const getNewMovie = await fetch(`${apiPhimMoi}/phim-moi-cap-nhat?page=1`);
  const getPhimLe = await fetch(`${api}/phim-le`);
  const getPhimBo = await fetch(`${api}/phim-bo`);
  const getPhimHoatHinh = await fetch(`${api}/hoat-hinh`);
  const getTvShow = await fetch(`${api}/tv-shows`);

  const newMovie = await getNewMovie.json();
  const phimLe = await getPhimLe.json();
  const phimBo = await getPhimBo.json();
  const phimHoatHinh = await getPhimHoatHinh.json();
  const tvShow = await getTvShow.json();
  const urlImage = tvShow.data.APP_DOMAIN_CDN_IMAGE;

  return (
    <div>
      <Noti />

      {/* List phim */}
      <>
        {/* PHIM MỚI NHẤT */}
        <DanhMucPhim
          movies={newMovie.items}
          domain=""
          categoryTitle="PHIM MỚI NHẤT"
        />

        {/* PHIM LẺ */}
        <DanhMucPhim
          movies={phimLe.data.items}
          domain={urlImage}
          categoryTitle="PHIM LẺ"
        />

        {/* PHIM BỘ */}
        <DanhMucPhim
          movies={phimBo.data.items}
          domain={urlImage}
          categoryTitle="PHIM BỘ"
        />

        {/* PHIM HOẠT HÌNH */}
        <DanhMucPhim
          movies={phimHoatHinh.data.items}
          domain={urlImage}
          categoryTitle="PHIM HOẠT HÌNH"
        />

        {/* TV SHOW */}
        <DanhMucPhim
          movies={tvShow.data.items}
          domain={urlImage}
          categoryTitle="TV SHOW"
        />
      </>
    </div>
  );
};

export default Home;
