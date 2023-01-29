import React, { useState } from 'react';
import ReactDom from 'react-dom';
import './App.css';
import { MenuDrawer } from './MenuDrawer';
import { Report } from './Report';

function App() {
  const [documentContent, setDocumentContent] = useState('<h5 class="MuiTypography-root MuiTypography-h5 css-ag7rrr-MuiTypography-root">Comments</h5>')
  return (
    <div className="App">
      <MenuDrawer setDocumentContent={setDocumentContent}/>
      <React.Fragment>
        {ReactDom.createPortal(<Report documentContent={documentContent}/>,document.getElementById('document'))}
      </React.Fragment>
    </div>
  );
}

export default App;
