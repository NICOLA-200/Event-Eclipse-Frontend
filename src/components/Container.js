import React from "react";

const getContainerStyles = (props) => {
    return {
        width: `${props.width}%`,
        height: `${props.height}vh`,
        backgroundColor: props.background,
        borderRadius: `${props.corner}px`,
        margin: '10px 0 10px 0',
    };
};

const Container = (props) => {
    return (
        <div 
            className={`${props.newClass}`}
            style={getContainerStyles(props)}
        >
            <img className="container_image" alt="test" src={props.link} />
        </div>
    );
};

export default Container;
