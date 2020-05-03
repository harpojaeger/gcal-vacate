import React from 'react';
import './Button.css';

export const Button = (props: { onClick: Function, label: string }) => <button className="GcalVacateButton" onClick={() => props.onClick()}>{props.label}</button>;
