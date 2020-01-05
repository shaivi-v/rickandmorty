import React from 'react';
import './style.scss';

class Character extends React.Component {
    calculateCreated = (createdDate) => {
        let diff = (new Date() - new Date(createdDate)) / (365*24*60*60*1000);
        return Math.round(diff);
    }
    render() {
        const item = this.props.item;
        return(
            <div className="character-container" key={item.id}>
                    <div className="posRelative">
                        <span><img src={item.image} alt="noimg"/></span>
                        <div className="character-img-banner">
                            <div className="character-banner-inner">
                                <span className="character-info-name">{item.name}</span>
                                <div>
                                    <span>{`id: ${item.id} - `}</span>
                                    <span>{`created ${this.calculateCreated(item.created)} years ago`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="character-info-main">
                        <div className="character-info-inner">
                            <span>STATUS</span>
                            <span className="character-info-content">{item.status}</span>
                        </div>
                        <div className="character-info-inner">
                            <span>SPECIES</span>
                            <span className="character-info-content">{item.species}</span>
                        </div>
                        <div className="character-info-inner">
                            <span>GENDER</span>
                            <span className="character-info-content">{item.gender}</span>
                        </div>
                        <div className="character-info-inner">
                            <span>ORIGIN</span>
                            <span className="character-info-content">{item.origin.name}</span>
                        </div>
                        <div className="character-info-inner">
                            <span>LAST LOCATION</span>
                            <span className="character-info-content">{item.location.name}</span>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Character