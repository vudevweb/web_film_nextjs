


export default function Loading() {
     return (
          <>
               <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", marginTop: "-120px" }}>
                    <div className="spinner-border text-warning" role="status">
                         <span className="visually-hidden">Loading...</span>
                    </div>
               </div>
          </>
     )
}