import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

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
          files.map((file) => (
            <div className={styles.uploaded_file} key={file.name}>
              {file.name}
            </div>
          ))}
      </div>
    </>
  );
};

export default Dropzone;
