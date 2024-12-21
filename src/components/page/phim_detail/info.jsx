/* eslint-disable @next/next/no-img-element */
// "use client";
import Image from "next/image";
const Info = ({ data }) => {
  if (!data || !data.movie) {
    return <div>Error loading movie details.</div>;
  }

  const { movie, episodes } = data;
  const {
    name = "Đang cập nhật",
    origin_name = "Đang cập nhật",
    content = "Đang cập nhật",
    poster_url = "",
    trailer_url = "",
    time = "Đang cập nhật",
    episode_current = "Đang cập nhật",
    episode_total = "Đang cập nhật",
    quality = "Đang cập nhật",
    lang = "Đang cập nhật",
    created = { time: null },
    director = ["Đang cập nhật"],
    actor = ["Đang cập nhật"],
    year = "Đang cập nhật",
  } = movie;

  const MovieInfo = () => (
    <div className="row p-3">
      <ul className="text-warning col-12 col-md-6">
        {[
          { label: "Tên phim", value: name },
          { label: "Tên chính thức", value: origin_name },
          { label: "Trạng thái", value: episode_current },
          { label: "Tổng số tập", value: episode_total },
          { label: "Chất lượng", value: quality },
        ].map(({ label, value }) => (
          <li key={label}>
            <p>
              <strong>{label}: </strong>
              {value}
            </p>
          </li>
        ))}
      </ul>
      <ul className="text-warning col-12 col-md-6">
        {[
          { label: "Ngôn ngữ", value: lang },
          { label: "Đạo diễn", value: director.join(", ") },
          { label: "Diễn viên", value: actor.join(", ") || "N/A" },
          { label: "Thời lượng", value: time },
          {
            label: "Ngày tạo",
            value: created?.time
              ? new Date(created.time).toLocaleDateString()
              : "N/A",
          },
        ].map(({ label, value }) => (
          <li key={label}>
            <p>
              <strong>{label}: </strong>
              {value}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );

  const EpisodeList = () => (
    <div>
      {episodes.map((episode, index) => (
        <div key={index} className="text-center mt-3">
          {episode.server_data.slice(0, 1).map((ep, i) => (
            <a
              key={i}
              href={`/xem-phim/${movie.slug}/${ep.slug}?server=${index}`}
              className="btn btn-warning me-3"
            >
              Xem ngay
            </a>
          ))}
          {trailer_url && (
            <a
              href={trailer_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-danger me-3"
            >
              Xem trailer
            </a>
          )}
        </div>
      ))}
    </div>
  );

  const TabContent = () => (
    <div className="tab-content" id="ex2-content">
      <div
        className="tab-pane fade show active"
        id="ex3-tabs-1"
        role="tabpanel"
        aria-labelledby="ex3-tab-1"
      >
        <MovieInfo />
        <EpisodeList />
      </div>
      <div
        className="tab-pane fade"
        id="ex3-tabs-2"
        role="tabpanel"
        aria-labelledby="ex3-tab-2"
      >
        <div className="p-3">
          <p className="text-warning">
            {content || "Nội dung đang cập nhật..."}
          </p>
        </div>
      </div>
      <div
        className="tab-pane fade"
        id="ex3-tabs-3"
        role="tabpanel"
        aria-labelledby="ex3-tab-3"
      >
        <div className="p-3">
          {episodes.map((episode, index) => (
            <div key={index}>
              <div className="text-warning">
                <strong>Server: </strong>
                {episode.server_name}
              </div>
              {episode.server_data.map((ep, i) => (
                <a
                  key={i}
                  href={`/xem-phim/${movie.slug}/${ep.slug}?server=${index}`}
                  className="btn btn-secondary btn-sm mt-2 me-2"
                >
                  {ep.name}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="card">
      <div className="card-body row">
        <div className="col-12 col-md-3 mb-3 mb-md-0">
          <div
            className="position-relative"
            style={{ width: "100%", height: "450px" }}
          >
            <Image
              loading="lazy"
              src={
                poster_url ||
                "https://lh5.googleusercontent.com/proxy/CGWXSjMMd2FLW31MkAwyyg6CTEa5JYhkmoqOjQOmJbdrIKICImHlALT85CBWNPzJ5WdaGavA6OBY9SSO7YMWaQ7om0jHPu8"
              }
              alt={name || "Poster"}
              className="rounded-2"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="col-12 col-md-9">
          <ul
            className="nav nav-tabs nav-justified mb-3"
            id="ex1"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active text-warning fw"
                id="ex3-tab-1"
                data-bs-toggle="tab"
                href="#ex3-tabs-1"
                role="tab"
                aria-controls="ex3-tabs-1"
                aria-selected="true"
              >
                Thông tin
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link text-warning fw"
                id="ex3-tab-2"
                data-bs-toggle="tab"
                href="#ex3-tabs-2"
                role="tab"
                aria-controls="ex3-tabs-2"
                aria-selected="false"
              >
                Nội dung phim
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link text-warning fw"
                id="ex3-tab-3"
                data-bs-toggle="tab"
                href="#ex3-tabs-3"
                role="tab"
                aria-controls="ex3-tabs-3"
                aria-selected="false"
              >
                Các tập phim
              </a>
            </li>
          </ul>
          <TabContent />
        </div>
      </div>
    </div>
  );
};

export default Info;
