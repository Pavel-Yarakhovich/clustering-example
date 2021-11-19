import React from "react";

// Components
import en from "../../testFiles/en.json";

// Helpers
import { CSVReader } from "react-papaparse";
import { prepareInitialData } from "./utils";

// Styling
import "./csvLocalizer.css";

const CsvLocalizer = () => {
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    console.log("DATA ", data);
  }, [data]);

  const buttonRef = React.useRef();

  const onFileLoad = (data) => {
    console.log("Loaded data ", data);
    setData(prepareInitialData(data));
  };

  const onError = (err, file, inputElem, reason) => {
    console.log("Error ", err);
  };

  const onRemoveFile = (data) => {
    console.log("Remove data ", data);
  };

  const openDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const removeFile = (e) => {
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  return (
    <>
      <header className="App-header">
        <p>CSV localizer</p>
      </header>
      {/* <main style={{ width: "95%" }}>
        <CSVReader
          ref={buttonRef}
          onFileLoad={onFileLoad}
          onError={onError}
          noClick
          noDrag
          onRemoveFile={onRemoveFile}
        >
          {({ file }) => (
            <aside
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              <button
                className="browse-file"
                type="button"
                onClick={openDialog}
              >
                Browse file
              </button>
              <div className="csv-file-name">{file && file.name}</div>
              <button className="browse-file" onClick={removeFile}>
                Remove
              </button>
            </aside>
          )}
        </CSVReader>
        {Object.entries(data)
          .filter(Boolean)
          .map(([key, values]) => {
            const cellWidth = 100 / values.length + 1;
            return (
              <div className="table-row" key={key}>
                <div className="cell" style={{ width: `${cellWidth}%` }}>
                  {key}
                </div>
                {values.map((v, i) => (
                  <div
                    key={i}
                    className="cell"
                    style={{ width: `${cellWidth}%` }}
                  >
                    {v}
                  </div>
                ))}
              </div>
            );
          })}
      </main> */}
      <main style={{ width: "95%" }}></main>
    </>
  );
};

export default CsvLocalizer;
