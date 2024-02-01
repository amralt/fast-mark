
import React from 'react';
import CreateScrinshot from './components/createScrinshot';
import ElementBlock from './components/elementBlock/elementBlock';
import Workspace from './components/workspace/workspace';

const App = () => {
  return (
    <div>
      <h1>Draggable Elements List</h1>
      <Workspace></Workspace>
      <CreateScrinshot></CreateScrinshot>
    </div>
  );
};

export default App;

