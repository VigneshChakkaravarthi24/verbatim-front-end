import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { getVerbatim } from "./getVerbatim";

const TextEditor = forwardRef(({ refText, onSave, onSubmit }, ref) => {
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
      if (shouldUpdateContent(content)) {
        updateContent(); // Call updateContent only if the word count condition is met
      }
      setEditableText(content);
    }
  };

  const updateContent = () => {
    if (editableContentRef.current) {
      const element = editableContentRef.current;
      const content = element.innerText;
      const updatedContent = getVerbatim(refText, content);
      console.log("The updated content is", updatedContent);
      const selection = window.getSelection();
      const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
      let cursorPosition = 0;

      if (range) {
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        cursorPosition = preCaretRange.toString().length;
      }

      if (editableText !== updatedContent) {
        element.innerHTML = updatedContent;
        setEditableText(updatedContent);
        lastWordCount.current = wordCount(updatedContent); // Update the last word count
      }

      restoreCaretPosition(element, cursorPosition);
    }
  };

  const restoreCaretPosition = (element, cursorPosition) => {
    const textNode = getTextNodeAtPosition(element, cursorPosition);
    const selection = window.getSelection();
    const range = document.createRange();

    if (textNode) {
      range.setStart(textNode.node, textNode.position);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const getTextNodeAtPosition = (root, index) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    let currentNode = walker.nextNode();
    let currentIndex = 0;

    while (currentNode) {
      const nextIndex = currentIndex + currentNode.length;
      if (index >= currentIndex && index <= nextIndex) {
        return {
          node: currentNode,
          position: index - currentIndex,
        };
      }
      currentIndex = nextIndex;
      currentNode = walker.nextNode();
    }

    return null;
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
          minHeight: "0",
          height: "100%",
          overflowY: "auto",
          whiteSpace: "pre-wrap",
          boxSizing: "border-box",
          backgroundColor: "#fff",
          fontFamily: "Arial, sans-serif",
          lineHeight: "1.5",
        }}
        className="border border-gray-300 rounded-lg bg-white flex-grow"
      >
        Edit me!
      </div>
    </div>
  );
});

export default TextEditor;
