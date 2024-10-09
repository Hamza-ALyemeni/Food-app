import { useRef } from 'react';
import CartModal from './CartModal.jsx';
import FormModal from './FormModal.jsx';


export default function Header({cart,onUpdateCartItemQuantity}) {
  const modal = useRef();
  const formDialog = useRef();

  const cartQuantity = cart.items.length;

  function handleOpenCartClick() {
    modal.current.open();
  }
  function handleOpenCheckout() {
    formDialog.current.openForm();
  }


  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button onClick={handleOpenCheckout}>Checkout</button>
      </>
    );
  }
    return ( 
    <>
        <FormModal title="Checkout Form" cartItems={cart.items} ref={formDialog}/>
        <CartModal
        ref={modal}
        cartItems={cart.items}
        onUpdateCartItemQuantity={onUpdateCartItemQuantity}
        title="Your Cart"
        actions={modalActions}
        />
        <div id="main-header">
            <div id="title">
                <img src="logo.jpg" alt="" />
                <h1>REACTFOOD</h1>
            </div>
            <div className="cart-item-actions">
                <button onClick={handleOpenCartClick}>Cart({cartQuantity})</button>
            </div>
        </div>
    </>
    )
}