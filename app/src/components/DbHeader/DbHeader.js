import React from 'react';
import Tab from '../Tab/Tab';
import "./DbHeader.css";

export default function DbHeader(){
    return (
        <div className = "DbHeader flex bg-black overflow-x-auto hover:overflow-x-scroll">
            <Tab />
        </div>
    );
}