import { Tooltip } from "@chakra-ui/react";
import { useState } from "react";

const ClipboardCopy = ({ copyText }) => {
  const [isCopied, setIsCopied] = useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <input
        style={{ border: 0, outline: "none" }}
        className="d-none position-absolute"
        type="text"
        value={copyText}
        readOnly
      />
      <Tooltip
        label={isCopied ? "Copied!" : "Click to Copy!"}
        bg="black"
        hasArrow
        placement="top"
        // closeOnClick={false}
      >
        <span onClick={handleCopyClick}>{isCopied ? "Copied!" : copyText}</span>
      </Tooltip>
    </>
  );
};

export default ClipboardCopy;
