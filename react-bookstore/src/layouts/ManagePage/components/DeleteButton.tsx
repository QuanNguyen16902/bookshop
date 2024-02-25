import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ConfirmDeleteModal from '../../Utils/ConfirmDeleteModal';
import authHeader from '../../../services/auth-header';

const DeleteButton: React.FC<{ id: number }> = ({ id }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
   
    const handleDelete = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:8080/api/admin/secure/delete/book/?bookId=${id}`, {
                method: 'DELETE',
                headers: {
                    ...authHeader(),
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete');
            }
            setIsLoading(false);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting item:', error);
            setIsLoading(false);
          
        }
    };

    const handleShowDeleteModal = () => setShowDeleteModal(true);
    const handleHideDeleteModal = () => setShowDeleteModal(false);

    const handleConfirmDelete = () => {
        handleDelete(); 
        handleHideDeleteModal(); 
    };

    return (
        <>
            <button onClick={handleShowDeleteModal} disabled={isLoading} style={{margin: "10px"}}className='btn btn-danger'>
                {isLoading ? 'Deleting...' : <FontAwesomeIcon icon={faTrash} />}
            </button>
            <ConfirmDeleteModal  
                show={showDeleteModal}
                onHide={handleHideDeleteModal}
                onConfirm={handleConfirmDelete}
            />
        </>
        
    );
};

export default DeleteButton;
