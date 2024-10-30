import React, { useState } from "react";
import './Collection.css';
import Collection from '../Assests/collection';
import Item from "../items/Item";

const Buy = () => {
    const [sortCriteria, setSortCriteria] = useState(""); // State for the selected sorting criteria
    const [sortedCollection, setSortedCollection] = useState([...Collection]); // State for the sorted collection

    // Sorting function based on selected criteria
    const sortItems = (criteria) => {
        let sortedArray = [...Collection];
        switch (criteria) {
            case "time":
                sortedArray.sort((a, b) => new Date(a.auction_end_time) - new Date(b.auction_end_time));
                break;
            case "model":
                sortedArray.sort((a, b) => a.model.localeCompare(b.model));
                break;
            case "brand":
                sortedArray.sort((a, b) => a.brand.localeCompare(b.brand));
                break;
            case "condition":
                sortedArray.sort((a, b) => a.condition.localeCompare(b.condition));
                break;
            default:
                break;
        }
        setSortedCollection(sortedArray);
    };

    // Handle sorting criteria change
    const handleSortChange = (e) => {
        const criteria = e.target.value;
        setSortCriteria(criteria);
        sortItems(criteria);
    };

    return (
        <div className="collection">
            <h1>COLLECTION</h1>
            <hr />
            <div className="sorting-controls">
                <label htmlFor="sort">Sort By: </label>
                <select id="sort" value={sortCriteria} onChange={handleSortChange}>
                    <option value="">Select</option>
                    <option value="time">Time</option>
                    <option value="model">Model</option>
                    <option value="brand">Brand</option>
                    <option value="condition">Condition</option>
                </select>
            </div>
            <div className="collections-items">
                {sortedCollection.map((item, i) => {
                    return (
                        <Item
                            key={i}
                            id={item.id}
                            name={item.name}
                            brand={item.brand}
                            starting_bid={item.starting_bid}
                            auction_end_time={item.auction_end_time}
                            condition={item.condition}
                            image={item.image}
                            model={item.model}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Buy;
