import React, { ReactNode, useState } from 'react';

interface ModalProps {
  buttonText?: string;
  title?: string;
  content?: ReactNode;
}

function Modal({
  buttonText = "Open Modal",
  title = "",
  content = <></>
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <button className='bg-ozo-green text-white p-2 rounded' onClick={toggleModal}>{buttonText}</button>
      {
        isOpen && (
          <div className='fixed z-50 inset-0 bg-black/50 flex items-center justify-center'>
            <div className='bg-white p-4 rounded shadow-md w-full max-w-3xl relative'>
              <div>
                <button className='float-right text-gray-500 cursor-pointer' onClick={toggleModal}>&#10006;</button>
                {title && <h2 className='text-xl font-bold mb-4'>{title}</h2>}
              </div>
              {content}
            </div>
          </div>
        )
      }
    </>
  )
}

export default Modal;