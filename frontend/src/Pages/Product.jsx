import React, { useContext } from "react";
import { ShopContext } from "../Context/Context";
import { useParams } from "react-router-dom";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay.jsx";

const Product = () => {
    const { all_product } = useContext(ShopContext);
    const { productId } = useParams();
    const product = all_product && Array.isArray(all_product)
        ? all_product.find((e) => e.id.toString() === productId)
        : null;

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <ProductDisplay product={product} />
        </div>
    );
};

export default Product;
