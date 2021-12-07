import React from "react";
import Cell from "./Cell/Cell";

// Components
import Dropzone from "../dropzone";

// Helpers
import { prepareInitialDataFromJson, combineTranslations } from "./utils";

// Styling
import "./csvLocalizer.css";

// upload files - let user choose
// when files are chosen display resulting table
// compare translations by keys
// mark 'en' as primary language
// show list of missing translations or extra ones if they are not presented in the 'en' list

const JsonLocalizer = () => {
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const [data, setData] = React.useState({});
  const [chosenFiles, setChosenFiles] = React.useState([]);
  const [activeCellId, setActiveCellId] = React.useState('');
  const [alert, setAlert] = React.useState('');

  const textareaRef = React.useRef();

  const unpackUploadedFiles = React.useCallback(() => {
    uploadedFiles.forEach((file) => {
      const fileReader = new FileReader();
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = (e) => {
        setChosenFiles((prev) => [...prev, JSON.parse(e.target.result)]);
      };
    });
  }, [uploadedFiles]);

  React.useEffect(() => {
    textareaRef.current?.focus();
  }, [activeCellId]);

  React.useEffect(() => {
    const data = combineTranslations(
      chosenFiles.map((file) => prepareInitialDataFromJson(file))
    );
    setData(data);
  }, [chosenFiles]);

  React.useEffect(() => {
    console.log("DATA ", data);
  }, [data]);

  const cellOnClick = React.useCallback((id) => {
    setActiveCellId(id);
  }, []);

  const onCancel = React.useCallback(() => {
    setActiveCellId('');
    setAlert('');
  }, []);

  let activeCellContent;
  const [activeKey, activeIndex] = activeCellId.split('-');
  if (activeKey && activeIndex)
    activeCellContent = data[activeKey][+activeIndex];

  const saveTranslation = React.useCallback(() => {
    const textareaContent = textareaRef.current.innerText;
    if (activeCellContent === textareaContent) {
      setAlert('Please, edit a translation or cancel');
      return;
    }
    const updatedTranslation = data[activeKey].map((val, idx) => {
      if (idx === +activeIndex) {
        return textareaContent;
      } else {
        return val;
      }
    });
    setData({
      ...data,
      [activeKey]: updatedTranslation,
    });
    setActiveCellId('');
  }, [activeCellId]);

  return (
    <>
      <header className="App-header">
        <p>JSON localizer</p>
      </header>
      <main style={{ width: "95%" }}>
        <Dropzone files={uploadedFiles} setFiles={setUploadedFiles} />
        {uploadedFiles.length > 0 && (
          <button onClick={() => unpackUploadedFiles()}>UNPACK FILES</button>
        )}
        <div></div>
        <div className="table-row">
          {chosenFiles.map((file) => (
            <div className="cell">{file.name}</div>
          ))}
        </div>
        {data &&
          Object.entries(data)
            .filter(Boolean)
            .map(([key, values]) => {
              const cellWidth = 100 / values.length;
              const showTextArea = activeKey === key;
              return (
                <>
                  <div className="table-row" key={key}>
                    {/* <div className="cell" style={{ width: `${cellWidth}%` }}>
                    {key}
                  </div> */}
                    {values.map((v, i) => {
                      const id = `${key}-${i}`;
                      return (
                        <Cell
                          key={id}
                          id={id}
                          style={{ width: `${cellWidth}%` }}
                          value={v}
                          onClick={(id) => cellOnClick(id)}
                          className={activeCellId === id ? "active-cell" : ""}
                        />
                      );
                    })}
                  </div>
                  {showTextArea && (
                    <div className='edit-translation'>
                      <div
                        contentEditable={true}
                        className='textarea'
                        ref={textareaRef}
                        onFocus={() => setAlert('')}
                      >
                        {activeCellContent}
                      </div>
                      <div className='buttons-container'>
                        <button className='save' onClick={saveTranslation}>
                          Save
                        </button>
                        <button className="cancel" onClick={onCancel}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                  {alert && showTextArea && <p className='alert'>{alert}</p>}
                </>
              );
            })}
      </main>
    </>
  );
};

export default JsonLocalizer;
