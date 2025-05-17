import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative border border-gray-800 bg-gray-900 text-green-500 font-mono text-base p-6 w-48 shadow-md rounded overflow-hidden box-border">
        {/* Terminal header */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 rounded-t px-2 box-border">
          <div className="float-left leading-6 text-gray-200">Status</div>
          <div className="float-right">
            <span className="inline-block w-2 h-2 ml-2 rounded-full bg-red-500"></span>
            <span className="inline-block w-2 h-2 ml-2 rounded-full bg-yellow-500"></span>
            <span className="inline-block w-2 h-2 ml-2 rounded-full bg-green-500"></span>
          </div>
        </div>
        
        {/* Terminal text with typing animation */}
        <div className="inline-block whitespace-nowrap overflow-hidden border-r-2 border-green-500 mt-6 animate-[typeAndDelete_4s_steps(11)_infinite,blinkCursor_0.5s_step-end_infinite_alternate]">
          Aatura...
        </div>
      </div>
    </div>
  );
};

export default Loader;