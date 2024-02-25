import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';
import MessageModel from '../../../models/MessageModel';
import { Pagination } from '../../Utils/Pagination';
import { SpinnerLoading } from '../../Utils/SpinnerLoading';
import { ResponseMessage } from './ResponseMessage';
import AdminMessageRequest from '../../../models/AdminRequestModel';
import AuthService from '../../../services/auth.service';
import authHeader from '../../../services/auth-header';
import React from 'react';
import IUser from '../../../types/user.type';

type State = {
    showAdminBoard: boolean;
    currentUser: IUser | undefined;
  };
export const AdminMessages = () => {
    
    // const { authState } = useOktaAuth();

    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const [httpError, setHttpError] = useState(null);
    
    // Messages endpoint State
    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [messagesPerPage] = useState(5);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [btnSubmit, setBtnSubmit] = useState(false);

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
      
    useEffect(() => {
        const fetchUserMessages = async () => {
            if (currentUser) {
                const url = `http://localhost:8080/api/messages/search/findByClosed/?closed=false&page=${currentPage - 1}&size=${messagesPerPage}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        ...authHeader(),
                        'Content-Type': 'application/json'
                    }
                };
                const messagesResponse = await fetch(url, requestOptions);
                if (!messagesResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                const messagesResponseJson = await messagesResponse.json();

                setMessages(messagesResponseJson._embedded.messages);
                setTotalPages(messagesResponseJson.page.totalPages);
            }
            setIsLoadingMessages(false);
        }
        fetchUserMessages().catch((error: any) => {
            setIsLoadingMessages(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [currentUser, currentPage, btnSubmit]);

    if (isLoadingMessages) {
        return (
            <SpinnerLoading/>
        );
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        );
    }

    async function submitResponseToQuestion(id: number, response: string) {
        if(currentUser && id != null && response !== ''){
            const url = `http://localhost:8080/api/messages/secure/admin/message/${currentUser?.id}`;
            const messageAdminRequestModel: AdminMessageRequest = new AdminMessageRequest(id, response);
            const requestOptions = {
                method: 'PUT',
                headers: {
                    ...authHeader(),
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(messageAdminRequestModel)
            };

            const messageAdminRequestModelResponse = await fetch(url, requestOptions);
                if(!messageAdminRequestModelResponse.ok){
                    throw new Error("Something wrong");
                }
            setBtnSubmit(!btnSubmit);
        }
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className='mt-3'>
            {messages.length > 0 ? 
                <>
                    <h5>Pending Q/A: </h5>
                    {messages.map(message => (
                        <ResponseMessage message={message} key={message.id} submitResponseToQuestion={submitResponseToQuestion}/>
                    ))}
                </> 
                :
                <h5>No pending Q/A</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPage={totalPages} paginate={paginate}/>}
        </div>
    );
}