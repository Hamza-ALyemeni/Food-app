import { useRef } from 'react';
import CartModal from './CartModal.jsx';


export default function Header() {
    // const cartCtx = useContext(CartContext);

    const modal = useRef();

    // const cartQuantity = cartCtx.items.length;
  
    function handleOpenCartClick() {
      modal.current.open();
    }
  
    let modalActions = <button>Close</button>;
  
    // if (cartQuantity > 0) {
    //   modalActions = (
    //     <>
    //       <button>Close</button>
    //       <button>Checkout</button>
    //     </>
    //   );
    // }
  
    return ( 
    <>
        <CartModal
        ref={modal}
        title="Your Cart"
        actions={modalActions}
        />
        <div id="main-header">
            <div id="title">
                <img src="logo.jpg" alt="" />
                <h1>REACTFOOD</h1>
            </div>
            <div className="cart-item-actions">
                <button onClick={handleOpenCartClick}>Cart(0)</button>
            </div>
        </div>
    </>
    )
}