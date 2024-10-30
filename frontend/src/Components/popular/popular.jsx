import React from "react";
import './popular.css'
import data_product from "../Assests/data";
import Item from "../items/Item.jsx";
const popular=()=>{
    return(
        <div className="popular">
            <h1>EXCLUSIVE</h1>
            <hr/>
            <div className="popular-item">
                {data_product.map((item,i)=>{
                    return <Item key={i} id={item.product_id} name={item.name} brand={item.brand} starting_bid={item.starting_bid} auction_end_time={item.auction_end_time} condition={item.condition} image={item.image} model={item.model}/>
                })}
            </div>
        </div>
    )
}
export default popular;