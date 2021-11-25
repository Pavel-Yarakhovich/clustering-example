import React from 'react';

import '../csvLocalizer.css';

const Cell = React.memo(({ style, value, id, onClick, className }) => {
  return (
    <>
      <div
        className={`cell ${className}`}
        style={style}
        onClick={() => onClick(id)}
      >
        {value}
      </div>
    </>
  );
});

export default Cell;
