import React from "react";
import './Breadcrums.css';

const Breadcrums = (props) => {
    const { product } = props;

    // Check if the product is defined
    if (!product) {
        return <div className="breadcrum">HOME</div>;
    }

    return (
        <div className="breadcrum">
            HOME --- {product.name} ---- {product.brand}
        </div>
    );
};

export default Breadcrums;
