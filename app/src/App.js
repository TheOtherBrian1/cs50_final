import Editor from "./page/Editor";
import {RecoilRoot} from 'recoil';
import React from 'react';

function App() {
  return (
    <RecoilRoot>
      <Editor />
    </RecoilRoot>
  );
}

export default App;
