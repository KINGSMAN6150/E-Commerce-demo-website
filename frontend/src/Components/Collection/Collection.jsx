// frontend/src/Components/Collection/Collection.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Collection.css';

const Collection = ({ watches }) => {
    const [sortCriteria, setSortCriteria] = useState("");
    const [sortedCollection, setSortedCollection] = useState([...watches]);

    useEffect(() => {
        // Sorting watches whenever the criteria or watches list changes
        sortItems(sortCriteria);
    }, [sortCriteria, watches]);

    const sortItems = (criteria) => {
        let sortedArray = [...watches];
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

    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
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
                {sortedCollection.map((item) => (
                    <div key={item.id} className="item">
                        <Link to={`/product/${item.id}`}>
                            <img src={item.image} alt={item.name} />
                            <div className="item-details">
                                <p>{item.name}</p>
                                <p><strong>Brand:</strong> {item.brand}</p>
                                <p><strong>Model:</strong> {item.model}</p>
                                <p><strong>Condition:</strong> {item.condition}</p>
                                <p><strong>Starting Bid:</strong> ${item.starting_bid}</p>
                                <p><strong>Ends:</strong> {new Date(item.auction_end_time).toLocaleDateString()}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Collection;
