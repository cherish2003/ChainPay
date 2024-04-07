import React, { useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ClipboardCheckIcon } from '@heroicons/react/solid';

const CodeBlock = ({ code }) => {
  const codeRef = useRef(null);

  const copyToClipboard = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(code)
        .then(() => {
          alert('Code copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy:', err);
        });
    }
  };

  return (
    <div className="relative h-[40rem]"> {/* Set a fixed height */}
      <div className="rounded-md overflow-hidden overflow-y-auto h-full"> {/* Enable vertical scrolling */}
        <SyntaxHighlighter language="javascript" style={darcula}>
          {code}
        </SyntaxHighlighter>
      </div>
      <button
        className="absolute top-4 right-10 bg-gray-700 text-white rounded-md p-2 hover:bg-gray-800 focus:outline-none"
        onClick={copyToClipboard}
      >
        <ClipboardCheckIcon className="h-5 w-5" />
      </button>
      <textarea
        ref={codeRef}
        className="absolute opacity-0"
        value={code}
        readOnly
      />
    </div>
  );
};

export default CodeBlock;
