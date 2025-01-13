require("dotenv").config();
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { Suspense } from "react";
import Loading from "./loading";
import AppHeader from "@/components/layouts/header";
import AppSearch from "@/components/template/search";
import AppFooter from "@/components/layouts/footer";
import { ViewTransitions } from "next-view-transitions";
import "../assets/css/main.css";
import "../assets/css/navbar.css";
import "../assets/css/theme.min.css";
import "../assets/feather/feather.css";
import "../assets/css/owl.carousel.min.css";
import "../assets/css/custom.css";

export const metadata = {
  title: "Xem phim online miễn phí",
  description:
    "Phimmoi ⚡ Phim HD VietSub | Phim Lẻ | Phim Bộ | Phim Chiếu Rạp | Xem phim Online miễn phí",
  imageUrl:
    "https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-1/381271892_805928278202949_6388609339400536337_n.jpg?stp=dst-jpg_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YFb859k94L8Q7kNvgEyV2nL&_nc_ht=scontent.fsgn5-6.fna&oh=00_AfAxzB7t6FbhZPtOvgKvxggnMuv_greJ9Ge85i9sJVLKBw&oe=663DB2D2",
  url: "/",
  type: "website",
  site_name: "Phimmoi",
  locale: "vi_VN",
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions >
      <html lang="vi" data-theme="dark">
        <body className="container">
          <Analytics />
          <Suspense fallback={<Loading />}>
            <AppHeader />
            <main className="mt-17" style={{ minHeight: "100vh" }}>
              <AppSearch />
              {children}
            </main>
            <AppFooter />
          </Suspense>

          <Script
            src="/js/jquery-3.5.1.slim.min.js"
            strategy="beforeInteractive"
          />
          <Script
            src="/js/bootstrap.bundle.min.js"
            strategy="beforeInteractive"
          />
          <Script src="/js/theme.min.js" strategy="beforeInteractive" />
          <Script src="/js/smooth-scrollbar.js" strategy="beforeInteractive" />
          <Script src="/js/mode.js" strategy="beforeInteractive" />
        </body>
      </html>
    </ViewTransitions>
  );
}
