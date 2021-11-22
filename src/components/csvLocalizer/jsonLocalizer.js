import React from 'react';
import Cell from './Cell/Cell';

// Components
import en from '../../testFiles/en.json';
import de from '../../testFiles/de.json';
import fr from '../../testFiles/fr.json';
import nl from '../../testFiles/nl.json';

// Helpers
import { prepareInitialDataFromJson, combineTranslations } from './utils';

// Styling
import './csvLocalizer.css';

// upload files - let user choose
// when files are chosen display resulting table
// compare translations by keys
// mark 'en' as primary language
// show list of missing translations or extra ones if they are not presented in the 'en' list

const JsonLocalizer = () => {
  const [data, setData] = React.useState({});
  const [chosenFiles, setChosenFiles] = React.useState([en, de, fr, nl]);
  const [shownInput, setShownInput] = React.useState('');
  const [newTranslation, setNewtranslation] = React.useState('');

  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [shownInput]);

  React.useEffect(() => {
    const data = combineTranslations(
      chosenFiles.map((file) => prepareInitialDataFromJson(file))
    );
    setData(data);
  }, [chosenFiles]);

  React.useEffect(() => {
    console.log('DATA ', data);
  }, [data]);

  const cellOnClick = React.useCallback((id) => {
    setShownInput(id);
    inputRef?.current?.focus();
  }, []);

  const onCancel = React.useCallback(() => {
    setShownInput('');
    setNewtranslation('');
  }, []);

  const saveTranslation = React.useCallback(() => {
    console.log(`id: ${shownInput}`, `translation: ${newTranslation}`);
  });

  return (
    <>
      <header className='App-header'>
        <p>JSON localizer</p>
      </header>
      <main style={{ width: '95%' }}>
        <div></div>
        <div className='table-row'>
          {chosenFiles.map((file) => (
            <div className='cell'>{file.name}</div>
          ))}
        </div>
        {data &&
          Object.entries(data)
            .filter(Boolean)
            .map(([key, values]) => {
              const cellWidth = 100 / values.length;
              return (
                <>
                  <div className='table-row' key={key}>
                    {/* <div className="cell" style={{ width: `${cellWidth}%` }}>
                    {key}
                  </div> */}
                    {values.map((v, i) => (
                      <Cell
                        key={`${key}-${i}`}
                        id={`${key}-${i}`}
                        style={{ width: `${cellWidth}%` }}
                        value={v}
                        onClick={(id) => cellOnClick(id)}
                        shownInput={shownInput}
                        className={
                          shownInput === `${key}-${i}` ? 'active-cell' : ''
                        }
                      />
                    ))}
                  </div>
                  {shownInput && shownInput.split('-')[0] === key && (
                    <div className='edit-translation'>
                      <input
                        placeholder='Enter a new translation'
                        ref={inputRef}
                        id={`input-${shownInput}`}
                        value={newTranslation}
                        onChange={(e) => setNewtranslation(e.target.value)}
                      />
                      <div className='buttons-container'>
                        <button className='save' onClick={saveTranslation}>
                          Save
                        </button>
                        <button className='cancel' onClick={onCancel}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
      </main>
    </>
  );
};

export default JsonLocalizer;
