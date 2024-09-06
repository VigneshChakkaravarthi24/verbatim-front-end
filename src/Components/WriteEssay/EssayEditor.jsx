import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";

const TextEditor = forwardRef(({ refText, onSave, onSubmit,userGroup,initialvalue }, ref) => {

  const [editableText, setEditableText] = useState("");
  const editableContentRef = useRef(null);
  const lastWordCount = useRef(0);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    getContent: () => {
      if (editableContentRef.current) {
        return editableContentRef.current.innerHTML;
      }
      return '';
    },
  }));

  const wordCount = (text) => {
    return text.split(/\s+/).filter(Boolean).length; // Count words
  };

  const shouldUpdateContent = (content) => {
    const currentWordCount = wordCount(content);
    return currentWordCount % 2 === 0 && currentWordCount !== lastWordCount.current;
  };

  const onInput = () => {
    if (editableContentRef.current) {
      const content = editableContentRef.current.innerText;
      
      // if (shouldUpdateContent(content)) {
      //   updateContent(); // Call updateContent only if the word count condition is met
      // }
      setEditableText(content);
    }
  };

  





  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex justify-between bg-gray-200 p-2 border-b border-gray-300 dark:bg-gray-700 dark:border-gray-600">
        <button
          onClick={() => onSave(editableText)}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
        >
          Save
        </button>
        <button
          onClick={() => onSubmit(editableText)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded"
        >
          Submit
        </button>
      </div>
  
      {/* Editable Area */}
      <div
        ref={editableContentRef}
        contentEditable="true"
        onInput={onInput}
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          width: "100%", // Adjust as needed
          height: "300px", // Reduced height
          overflowY: "auto", // Enable vertical scrolling
          whiteSpace: "pre-wrap",
          boxSizing: "border-box",
          backgroundColor: "#fff",
          fontFamily: "Arial, sans-serif",
          lineHeight: "1.5",
        }}
        className="border border-gray-300 rounded-lg bg-white flex-grow"
      >
        {initialvalue}
      </div>
    </div>
  );
    
});

export default TextEditor;
