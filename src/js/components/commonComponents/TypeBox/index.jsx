import React from 'react';
import './index.css';

class TypeBox extends React.Component {
    constructor(props) {
        super(props)
        this.color = {
            Grass: "#7c5",
            Poison: "#a59",
            Fire: "#f42",
            Flying: "#89f",
            Dragon: "#76e",
            Water: "#39f",
            Bug: "#ab2",
            Normal: "#aa9",
            Dark: "#754",
            Electric: "#fc3",
            Psychic: "#f59",
            Ground: "#db5",
            Ice: "#6cf",
            Steel: "#aab",
            Fairy: "#e9e",
            Fighting: "#b54",
            Rock: "#ba6",
            Ghost: "#66b",
        }
    }
    render() {
        return (
            <div className="type-box" style={{ backgroundColor: this.color[this.props.type] }}>{this.props.type}</div>
        )
    }
}

export default TypeBox;