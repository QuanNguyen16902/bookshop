import { Link } from "react-router-dom"

export const ExploreTopBook = () => {
    return(
        <div className="p-5 mb-4 bg-dark header">
            <div className="container-fluid py-5 text-white 
            d-flex justify-content-center align-items-center">
                <div>
                    <h2 className="display-6 fw-bold">"Hành trình thông qua những trang sách kỳ diệu."</h2>
                    <p className="col-md-8 fs-4">Bạn đã sẵn sàng khám phá?</p>
                    <Link type="button" className="btn main-color btn-lg text-white" to='/search'>Khám phá sách hàng đầu</Link>
                </div>
            </div>
        </div>
    )
}