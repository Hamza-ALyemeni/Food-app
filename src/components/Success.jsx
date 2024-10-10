import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const Success = forwardRef(function Modal(
  { title },
  ref
) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
      close: () => {
        dialog.current.close();
      }
    };
  });

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <div id="modal-actions">
          <button type="button" onClick={() => dialog.current.close()}>Ok</button>
     </div>
    </dialog>,
    document.getElementById('success')
  );
});

export default Success;
