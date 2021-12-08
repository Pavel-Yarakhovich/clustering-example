import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import CloseButton from '../UI/CloseButton/CloseButton';

import styles from './dropzone.module.css';

const uniqueFiles = new Map();

const Dropzone = ({ files, setFiles }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => uniqueFiles.set(file.name, file));
      setFiles([...uniqueFiles.values()]);
    },
    [setFiles]
  );

  const { fileRejections, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: '.json',
    });

  const removeFile = React.useCallback((fileName) => {
    setFiles((prev) => prev.filter((f) => f.name !== fileName));
  }, []);

  return (
    <>
      <div {...getRootProps()} className={styles.dropzone}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files.</p>
        )}
        {fileRejections[0] && (
          <p className={styles.extension_alert}>Only json files accepted.</p>
        )}
      </div>
      <div className={styles.files_container}>
        {files.length > 0 &&
          files.map((file) => {
            const fileName = file.name;
            return (
              <>
                <div className={styles.uploaded_file} key={fileName}>
                  <div>{fileName}</div>
                  <CloseButton onClick={() => removeFile(fileName)} />
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default Dropzone;
