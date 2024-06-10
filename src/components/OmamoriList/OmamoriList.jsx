import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Omamori from '../Omamori/Omamori';
import "./OmamoriList.css";

function OmamoriList({omamoris}) {
  return (
    <div className="omamori-list">
      { omamoris.map( omamori => <Omamori omamori={omamori} key={uuidv4()} />)}
    </div>
  );
}

export default OmamoriList;
