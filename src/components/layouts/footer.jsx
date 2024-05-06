

function AppFooter() {
     return (
          <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top mt-10">
               <div className="col-md-4 d-flex align-items-center">
                    <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                         <svg className="bi" width={30} height={24}><use xlinkHref="#bootstrap" /></svg>
                    </a>
                    <span className="mb-3 mb-md-0 text-muted fw text-warning">© 2024 code by vudevweb, no copyright</span>
               </div>
               <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li className="ms-3"><a className="text-muted fw text-warning" href="https://www.facebook.com/vudevweb" target="_blank" ><i className="fe fe-facebook"></i></a></li>
                    <li className="ms-3"><a className="text-muted fw text-warning" href="https://t.me/vudevweb" target="_blank" ><i className="fe fe-message-circle"></i></a></li>
                    <li className="ms-3"><a className="text-muted fw text-warning" href="https://www.instagram.com/vudevweb" target="_blank"><i className="fe fe-instagram"></i></a></li>
                    <li className="ms-3"><a className="text-muted fw text-warning" href="https://github.com/vudevweb" target="_blank" ><i className="fe fe-github"></i></a></li>
               </ul>
          </footer>

     );
}

export default AppFooter;