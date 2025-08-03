/* eslint-disable prettier/prettier */
import { createContext, useContext, useEffect, useState } from "react";

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [file, setFile] = useState(null);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
    else return (bytes / 1048576).toFixed(2) + " MB";
  };

  const handleFileChange = (file) => {
    if (!file) return;
    setSelectedFile(null);
    setFilePreview(null);
    setSelectedImage(null);
    setImagePreview(null);
    const reader = new FileReader();
    const uniqueFile = { file, timestamp: Date.now() };
    setFile(file)

    if (file.type.startsWith("image/")) {
      setSelectedImage(uniqueFile);

      reader.onload = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setSelectedFile(uniqueFile);

      const metadata = {
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        extension: file.name.split(".").pop(),
      };

      reader.onload = () => {
        setFilePreview((prev) => ({
          ...metadata,
          base64Content: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <FileContext.Provider
      value={{
        selectedImage,
        setSelectedImage,
        imagePreview,
        setImagePreview,
        selectedFile,
        setSelectedFile,
        filePreview,
        setFilePreview,
        formatFileSize,
        handleFileChange,
        file
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

// Custom Hook
export const useFileUploader = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileUploader must be used within a FileProvider");
  }
  return context;
};
