/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BOSS: process.env.BOSS,
    API_PHIM: process.env.API_PHIM,
    API_THE_LOAI: process.env.API_THE_LOAI,
    API_QUOC_GIA: process.env.API_QUOC_GIA,
    API_DANH_MUC: process.env.API_DANH_MUC,
    API_TIM_KIEM: process.env.API_TIM_KIEM,
    API_DANH_SACH: process.env.API_DANH_SACH,
    API_NAM_PHAT_HANH: process.env.API_NAM_PHAT_HANH,
    API_MOI_CAP_NHAT: process.env.API_MOI_CAP_NHAT,
  },
  images: {
    domains: ["img.phimapi.com", "phimimg.com"],
  },
};

export default nextConfig;
