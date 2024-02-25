import { useOktaAuth } from "@okta/okta-react"
import { useEffect, useState } from "react";
import BookRequest from "../../../models/BookRequest";
import IUser from "../../../types/user.type";
import AuthService from "../../../services/auth.service";
import authHeader from "../../../services/auth-header";
import React from "react";
 
type State = {
    showAdminBoard: boolean;
    currentUser: IUser | undefined;
  };
export const AddNewBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [category, setCategory] = useState('Category');
    const [selectedImage, setSelectedImage] = useState<any>(null);

    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    function categoryField(value: string){
        setCategory(value);
    }

    const [state, setState] = React.useState<State>({
        showAdminBoard: false,
        currentUser: undefined,
      });
      React.useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
          setState({
            currentUser: user,
            showAdminBoard: user.roles.includes("ROLE_ADMIN"),
          });
        } 
      }, []);
      // const { au } = useOktaAuth();
    
      const { currentUser } = state;
    
      
    async function base64ConversionForImage(e: any) {
        if(e.target.files[0]){
            getBase64(e.target.files[0]);

        }
    }

    function getBase64(file: any){
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(){
            setSelectedImage(reader.result);
        };
        reader.onerror = function (error){
            console.log('Error', error);
        }
    }
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    setSelectedImage(e.target.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
      };
    async function submitNewBook() {
        const url = `http://localhost:8080/api/admin/secure/add/book`;
        if(currentUser && currentUser.id && title !== '' && author !== '' && category !== 'Category'
                && description !== '' && price >= 0 && discountPercent>=0){
const book: BookRequest = new BookRequest(title, author, description, price, discountPercent, category);
                    book.img = selectedImage;
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            ...authHeader(),
                            'Content-Type' : 'application/json'
                        },
                        body: JSON.stringify(book)
                    };

                    const submitNewBookResponse = await fetch(url, requestOptions);
                    if(!submitNewBookResponse.ok){
                        throw new Error('Something went wrong')
                    }
                    setTitle('');
                    setAuthor('');
                    setDescription('');
                    setPrice(0);
                    setDiscountPercent(0)
                    setCategory('Category');
                    setSelectedImage(null);
                    setDisplaySuccess(true);
                    setDisplayWarning(false);
                }else{
                    setDisplayWarning(true);
                    setDisplaySuccess(false);
                }
    }

    return(
        <div className='container mt-5 mb-5'>
            {displaySuccess && 
                <div className="alert alert-success" role="alert">
                    Book added successfully
                </div>
            }
            {displayWarning && 
                <div className="alert alert-danger" role="alert">
                    All fields must be fill out
                </div>

            }
            <div className="card">
                <div className="card-header">
                    Add a new book
                </div>
                <div className="card-body">
                    <form method="POST">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" name="title" required
                                        onChange={e => setTitle(e.target.value)} value={title}/>
                            </div>
                            <div className="col-md-3 mb-3">
                               <label htmlFor="author" className="form-label">Author</label>
                                <input type="text" className="form-control" id="author" name="author" required
                                        onChange={e => setAuthor(e.target.value)} value={author}/>
                            </div>
                            <div className="col-md-3 mb-3">
                               <label htmlFor="category" className="form-label">Category</label>
                                <button className="form-control btn btn-secondary dropdown-toggle" type="button"
                                        id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                                            {category}
                                </button>
                                <ul id='addNewBook' className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a onClick={() => categoryField('Cloud Computing')} className="dropdown-item">Cloud Computing</a></li>
                                    <li><a onClick={() => categoryField('Data Science')} className="dropdown-item">Data Science</a></li>
                                    <li><a onClick={() => categoryField('IT Operations')} className="dropdown-item">IT Operations</a></li>
                                    <li><a onClick={() => categoryField('Design')} className="dropdown-item">Design</a></li>
                                    <li><a onClick={() => categoryField('Development')} className="dropdown-item">Development</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" id='exampleFormControlTextarea1' rows={3}
                                        onChange={e => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                        <div className="row">
                        <div className="col-md-3 mb-3">
                            <label htmlFor="" className="form-label">Price</label>
                            <input type="number" className="form-control" name="Price" required
                                    onChange={e => setPrice(Number(e.target.value))} value={price}/>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="" className="form-label">Discount Percent</label>
                            <input type="number" className="form-control" name="DiscountPercent" required
                                    onChange={e => setDiscountPercent(Number(e.target.value))} value={discountPercent}/>
                        </div>
                        </div>
                       
                        {/* <input type="file" name="" id="" onChange={e => base64ConversionForImage(e)}/> */}
                        <div className="col-md-4 mb-3">
                            <label htmlFor="image">Book Image</label>
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                onChange={handleImageChange}
                            />
                </div>
                        {selectedImage && (
                            <div className="form-group">
                                <label>Image Preview</label>
                                <img src={selectedImage} width='200px' height='300px' alt="Book Preview" className="img-thumbnail" />
                            </div>
                      )}
                        <div>
                            <button type="button" className="btn btn-primary mt-3" onClick={submitNewBook}>
                                Add Book
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}