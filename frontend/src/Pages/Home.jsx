import React from "react";
import Hero from "../Components/Hero/Hero"
import Popular from "../Components/popular/popular";
import Quote from "../Components/Quote/Quote"
import Receive from "../Components/Receive/Receive";
import Footer from "../Components/Footer/Footer";
const Home=()=>{
    return(
        <div>
            <Hero />
            <Popular />
            <Quote />
            <Receive />
            <Footer />
        </div>
    )
}
export default Home