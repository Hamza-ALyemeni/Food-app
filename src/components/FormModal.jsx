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

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <form method="post" id="modal-actions">
        <label htmlFor=""> name : </label>
        <input type='text' name='name'/>
        <label htmlFor=""> email : </label>
        <input type='email' name='email'/>
        <label htmlFor=""> street : </label>
        <input type='text' name='street'/>
        <label htmlFor=""> postal code : </label>
        <input type='text' name='postal-code'/>
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
