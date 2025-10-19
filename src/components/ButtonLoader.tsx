import React from 'react';

function ButtonLoader() {
  return (
    <div className='w-full flex justify-center'>
      <div className='w-5 aspect-square border-2 border-gray-200 border-t-2 border-t-gray-500 rounded-full animate-spin'></div>
    </div>
  );
}

export default ButtonLoader;