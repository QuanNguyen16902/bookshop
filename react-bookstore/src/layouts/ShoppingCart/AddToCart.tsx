import React, { useState } from 'react';
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';
import IUser from '../../types/user.type';

type Props = {
  bookId: number | undefined;
  updateCheckoutCount: (quantity: number) => void;
};

const AddToCart: React.FC<Props> = ({ bookId, updateCheckoutCount }) => {
  const [userId, setUserId] = useState<number | undefined>(undefined);

  React.useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setUserId(user.id);
    }
  }, []);

  const handleAddToCartClick = async () => {
    if (!bookId || !userId) {
      return;
    }
    const quantityInput = (document.getElementById('quantity' + bookId) as HTMLInputElement)?.value;

    const url = `http://localhost:8080/api/cart/add/${bookId}/${quantityInput}/${userId}`;

    try {
      const cartItem = { id: 0, quantity: Number(quantityInput), bookId, userId };
      const requestOptions = {
        method: 'POST',
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItem)
      };
      const responseData = await fetch(url, requestOptions);
      if (!responseData.ok) {
        throw new Error("Could not add more item"
        + "because there's already " + cartItem.quantity + " items(s) "
        + "in your shopping cart. Maximum allowed quantity is 10.");
      }
      const message = await responseData.text();
      showModalDialog('Shopping Cart', message);
      updateCheckoutCount(Number(quantityInput));
    } catch (error) {
      alert(error);
    }
  };

  const showModalDialog = (title: string, content: string) => {
    alert(`${title}: ${content}`);
  };

  return (
    <div className="mt-3">
      <input type="button" value="Add to Cart" id="buttonAdd2Cart" className="btn btn-success" onClick={handleAddToCartClick} />
    </div>
  );
};

export default AddToCart;
