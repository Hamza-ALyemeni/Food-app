import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';


const FormModal = forwardRef(function Modal(
  { cartItems, title },
  ref
) {
  const dialog = useRef();
 
  useImperativeHandle(ref, () => {
    return {
      openForm: () => {
        dialog.current.showModal();
      },
      close: () =>{
        dialog.current.close();
      }
    };
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(e.target); // Get form data

    // Create order object with customer details and items
    const orderData = {
      customer: {
        name: formData.get('name'),
        email: formData.get('email'),
        street: formData.get('street'),
        city: formData.get('city'),
        'postal-code': formData.get('postal-code'),
      },
      items: [...cartItems],
    };

    try {
      // Send POST request to backend
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order: orderData }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to place order');
      }

      console.log('Order created:', result);
      dialog.current.close(); // Close the modal after successful order submission
    } catch (error) {
      console.error('Error:', error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <form method="post" id="modal-actions" onSubmit={handleSubmit}>
        <label htmlFor=""> name : </label>
        <input type='text' name='name' required/>
        <label htmlFor=""> email : </label>
        <input type='email' name='email' required/>
        <label htmlFor=""> street : </label>
        <input type='text' name='street' required/>
        <label htmlFor=""> postal code : </label>
        <input type='text' name='postal-code' required/>
        <label htmlFor=""> city : </label>
        <input type='text' name='city' required/>
        <div id="modal-actions">
          <button type="button" onClick={() => dialog.current.close()}>Close</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </dialog>,
    document.getElementById('form-modal')
  );
});

export default FormModal;
