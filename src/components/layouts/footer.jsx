function AppFooter() {
  return (
    <div className="footer__custom">
      <footer className="mt-4 d-flex flex-wrap justify-content-between align-items-center p-3 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          ></a>
          <span className="mb-3 mb-md-0 text-dark fw ">
            © 2024 code by{" "}
            <a className="text-warning" href="http://">
              vudevweb
            </a>
            , copyright
          </span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a
              className="text-muted fw text-warning"
              href="https://www.facebook.com/vudevweb"
              target="_blank"
            >
              <i className="fe fe-facebook"></i>
            </a>
          </li>
          <li className="ms-3">
            <a
              className="text-muted fw text-warning"
              href="https://t.me/vudevweb"
              target="_blank"
            >
              <i className="fe fe-message-circle"></i>
            </a>
          </li>
          <li className="ms-3">
            <a
              className="text-muted fw text-warning"
              href="https://www.instagram.com/vudevweb"
              target="_blank"
            >
              <i className="fe fe-instagram"></i>
            </a>
          </li>
          {/* <li className="ms-3"><a className="text-muted fw text-warning" href="https://github.com/vudevweb" target="_blank" ><i className="fe fe-github"></i></a></li> */}
        </ul>
      </footer>
    </div>
  );
}

export default AppFooter;
