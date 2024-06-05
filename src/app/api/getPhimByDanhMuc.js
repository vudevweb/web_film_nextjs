
const getPhimByDanhMuc = async (danhmuc) => {
    const api = "https://phimapi.com/v1/api/danh-sach/";
    const res = await fetch(api + danhmuc)
    const data = res.data
    return data;
}

export default getPhimByDanhMuc;