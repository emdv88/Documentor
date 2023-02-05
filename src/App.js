import React, { useState } from 'react';
import ReactDom from 'react-dom';
import './App.css';
import { MenuDrawer } from './MenuDrawer';
import { Report } from './Report';
import TextSelection from 'text-selection-react'

function App() {
  const [documentContent, setDocumentContent] = useState('<h5 class="MuiTypography-root MuiTypography-h5 css-ag7rrr-MuiTypography-root">Comments</h5>')
  return (
    <div className="App">
      <MenuDrawer setDocumentContent={setDocumentContent}/>
      <React.Fragment>
        {ReactDom.createPortal(<Report documentContent={documentContent}/>,document.getElementById('document'))}
      </React.Fragment>
      <TextSelection
            unmark={true}
            unmarkText="Remove"
            events={[
              {
                text: 'Submit',
                handler: (html, text) => this.toggleCollectionModal(text) 
                
              },
              {
                text: 'facebook',
                handler: (html, text) => {
                  console.log('text ----', text)
                  console.log('html ----', html)
                }
              }
            ]}

            color={'purple'}
            colorText={true}
        />
    </div>
  );
}

export default App;
