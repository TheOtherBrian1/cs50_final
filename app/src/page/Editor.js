import React from 'react';
import DbHeader from '../components/DbHeader/DbHeader';
import LeftNav from '../components/LeftNav/LeftNav';
import Canvas from '../components/Canvas/Canvas';
import "./Editor.css";

function Editor(){
    return (
        <div className = "Editor">
            <div className = "grid-header">
                <DbHeader />
            </div>
            <div className = "grid-left-nav">
                <LeftNav />
            </div>
            <div className = "grid-canvas">
                <Canvas />
            </div>
        </div>
    );
}

export default React.memo(Editor);