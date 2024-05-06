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
     },

     
};

export default nextConfig;
