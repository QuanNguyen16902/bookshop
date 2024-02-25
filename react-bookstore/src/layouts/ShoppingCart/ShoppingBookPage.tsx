import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { Pagination } from "../Utils/Pagination";
import { Link } from "react-router-dom";

export const ShoppingCartPage = () => {
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(12);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [search, setSearch] = useState("");
    const [searchUrl, setSearchUrl] = useState("");
    const [categorySelection, setCategorySelection] = useState("Book category");
    useEffect(() => {
        const fetchBook = async () => {
          const baseUrl: string = "http://localhost:8080/api/books";
          let url: string = "";
    
          if (searchUrl === "") {
            url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
          } else {
            let searchWithPage = searchUrl.replace(
              "<pageNumber>",
              `${currentPage - 1}`
            );
            url = baseUrl + searchWithPage;
          }
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Something wrong");
          }
    
          const responseJson = await response.json();
    
          const responseData = responseJson._embedded.books;
    
          setTotalAmountOfBooks(responseJson.page.totalElements);
          setTotalPage(responseJson.page.totalPages);
    
          const loaddedBooks: BookModel[] = [];
    
          for (const key in responseData) {
            loaddedBooks.push({
              id: responseData[key].id,
              title: responseData[key].title,
              author: responseData[key].author,
              description: responseData[key].description,
              price: responseData[key].price,
              discountPercent: responseData[key].discountPercent,
              category: responseData[key].category,
              img: responseData[key].img,
              cost: responseData[key].cost,
              discountPrice: responseData[key].discountPrice
            });
          }
    
          setBooks(loaddedBooks);
          setIsLoading(false);
        };
        fetchBook().catch((error: any) => {
          setIsLoading(false);
          setHttpError(error.message);
        });
        window.scrollTo(0, 0); // scroll to the top
      }, [currentPage, searchUrl]);
      
  const searchHandleChange = () => {
    setCurrentPage(1);
    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`
      );
    }
    setCategorySelection("Book category");
  };

  const categoryField = (value: string) => {
    setCurrentPage(1);

    if (
      value === "Cloud Computing" ||
      value === "Data Science" ||
      value === "IT Operations" ||
      value === "Design" ||
      value === "Development"
    ) {
      setCategorySelection(value);
      setSearchUrl(
        `/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`
      );
    } else {
      setCategorySelection("All");
      setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`);
    }
  };

  const indexOfLastBook: number = currentPage * booksPerPage;
  const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
  let lastItem =
    booksPerPage * currentPage <= totalAmountOfBooks
      ? booksPerPage * currentPage
      : totalAmountOfBooks;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return (
        <div>
        <div>
          <h2 className="text-center">Shopping Book</h2>
          <div className="row mt-2">
            <div className="col-6">
            <div className="d-flex">
                  <input
                    type="search"
                    className="form-control me-1"
                    placeholder="Search"
                    aria-labelledby="Search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-success"
                    onClick={() => searchHandleChange()}
                  >
                    Search
                  </button>
                </div>
            </div>
            <div className="col-4">
            <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuBtn1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {categorySelection}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuBtn1"
                  >
                    <li onClick={() => categoryField("All Categories")}>
                      <a href="#" className="dropdown-item">
                        All Categories
                      </a>
                    </li>
                    <li onClick={() => categoryField("Cloud Computing")}>
                      <a href="#" className="dropdown-item">
                        Cloud Computing
                      </a>
                    </li>
                    <li onClick={() => categoryField("Data Science")}>
                      <a href="#" className="dropdown-item">
                        Data Science
                      </a>
                    </li>
                    <li onClick={() => categoryField("IT Operations")}>
                      <a href="#" className="dropdown-item">
                        IT Operations
                      </a>
                    </li>
                    <li onClick={() => categoryField("Design")}>
                      <a href="#" className="dropdown-item">
                        Design
                      </a>
                    </li>
                    <li onClick={() => categoryField("Development")}>
                      <a href="#" className="dropdown-item">
                        Development
                      </a>
                    </li>
                  </ul>
                </div>
            </div>
          </div>
          <br></br>
          <div className="row">
          {totalAmountOfBooks > 0 ? (
                  <>
                    <div>
                      <h5>Number of Results: ({totalAmountOfBooks})</h5>
                    </div>
                    <p>
                      {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks}{" "}
                      items
                    </p>
                 
            
            <div className="container-fluid">
            <div className="row">

            {books.map((book) => {
                     
                     return (
                        <div className="col-sm-3 text-center ">
                       <div key={book.id}>
                         <div>
                         <Link href="" className="text-decoration-none" to={`/checkout/${book.id}`}>
                         <img
                             src={book.img}
                             width="250px"
                             height="350"
                             alt="default"
                           />
                           <br />
                            <b> {book.title} </b>
                        </Link>
                         </div>
                        
                         <span><del style={{fontSize:'large', color:'red'}}>${book.price}</del></span> &nbsp;
                         <span>${book.discountPrice}</span>
                       </div>
                       </div>
                     );
                   })}  
                       </div>
            </div>
                  
                 
            </>
                ) : (
                  <div className="m-5">
                    <h3>No items have title '{search}'</h3>
                    <a
                      href="#"
                      className="btn main-color btn-md px-4 me-md-2 fw-bold text-white"
                      type="button"
                    >
                      More Info
                    </a>
                  </div>
                )}
                {/* Chi render khi tong page > 1  */}
                {totalPage > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPage={totalPage}
                    paginate={paginate}
                  />
                )}
          </div>
        </div>
      </div>
    )
}