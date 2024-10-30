import img1 from './data_images/1.jpg'
import img2 from './data_images/2.jpg'
import img3 from './data_images/3.jpg'
import img4 from './data_images/4.jpg'
import img5 from './data_images/5.jpg'
import img6 from './data_images/6.jpg'
import img7 from './data_images/7.jpg'
import img8 from './data_images/8.jpg'
import img9 from './data_images/9.png'
import img10 from './data_images/10.jpg'
import img11 from './data_images/11.jpg'
import img12 from './data_images/12.jpg'
import img13 from './data_images/13.jpg'
import img14 from './data_images/14.jpg'
import img15 from './data_images/15.jpg'

let collection_product = [
    {
        id:1,
        name: "Rolex Submariner",
        brand: "Rolex",
        description: "Luxury dive watch with automatic movement and stainless steel case.",
        starting_bid: 8500,
        currency: "USD",
        auction_end_time: "2024-10-20T18:00:00Z",
        condition: "New",
        model: "Submariner 126610LN",
        image: img1,
      },
      {
        id:2,
        name: "Omega Speedmaster Moonwatch",
        brand: "Omega",
        description: "Chronograph watch with a hand-wound mechanical movement and hesalite crystal.",
        starting_bid: 5500,
        currency: "USD",
        auction_end_time: "2024-10-21T15:30:00Z",
        condition: "Pre-Owned",
        model: "Speedmaster Professional 311.30.42.30.01.005",
        image:img2,
      },
      {
        id: 3,
        name: "Tag Heuer Carrera Calibre 16",
        brand: "Tag Heuer",
        description: "Sporty chronograph with automatic movement and tachymeter bezel.",
        starting_bid: 3500,
        currency: "USD",
        auction_end_time: "2024-10-22T20:00:00Z",
        condition: "New",
        model: "Carrera CV2010.BA0794",
        image:img3,
      },
      {
        id: 4,
        name: "Breitling Navitimer 01",
        brand: "Breitling",
        description: "Pilot watch with automatic chronograph movement and slide rule bezel.",
        starting_bid: 6200,
        currency: "USD",
        auction_end_time: "2024-10-23T12:00:00Z",
        condition: "Pre-Owned",
        model: "Navitimer 01 AB012012/BB01",
        image:img4,
      },
      {
        id: 5,
        name: "Patek Philippe Nautilus",
        brand: "Patek Philippe",
        description: "Iconic luxury sports watch with automatic movement and porthole-shaped case.",
        starting_bid: 40000,
        currency: "USD",
        auction_end_time: "2024-10-24T17:45:00Z",
        condition: "New",
        model: "Nautilus 5711/1A",
        image:img5,
      },
    {
        id:6,
        name: "Rolex Submariner",
        brand: "Rolex",
        description: "Classic diver's watch with water resistance and rotating bezel.",
        starting_bid: 8000,
        currency: "USD",
        auction_end_time: "2024-10-20T12:00:00Z",
        condition: "Pre-Owned",
        model: "Submariner Date 116610LN",
        image:img6,
    },
    {
        id:7,
        name: "Omega Speedmaster",
        brand: "Omega",
        description: "Famous chronograph associated with space exploration.",
        starting_bid: 5000,
        currency: "USD",
        auction_end_time: "2024-10-21T16:00:00Z",
        condition: "New",
        model: "Speedmaster Moonwatch Professional",
        image:img7
    },
    {
        id: 8,
        name: "Tag Heuer Carrera",
        brand: "Tag Heuer",
        description: "Stylish chronograph inspired by motorsports.",
        starting_bid: 3500,
        currency: "USD",
        auction_end_time: "2024-10-22T14:00:00Z",
        condition: "New",
        model: "Carrera Calibre 16",
        image:img8
    },
    {
        id: 9,
        name: "Breitling Navitimer",
        brand: "Breitling",
        description: "Iconic pilot's watch with slide rule bezel for flight calculations.",
        starting_bid: 6000,
        currency: "USD",
        auction_end_time: "2024-10-23T11:00:00Z",
        condition: "Pre-Owned",
        model: "Navitimer 01",
        image:img9
    },
    {
        id: 10,
        name: "Patek Philippe Nautilus",
        brand: "Patek Philippe",
        description: "Luxury sports watch with elegant design and high craftsmanship.",
        starting_bid: 30000,
        currency: "USD",
        auction_end_time: "2024-10-24T13:00:00Z",
        condition: "Pre-Owned",
        model: "Nautilus 5711",
        image:img10
    },
    {
        id: 11,
        name: "IWC Portugieser Chronograph",
        brand: "IWC",
        description: "Elegant chronograph with a slim case and classic design.",
        starting_bid: 7000,
        currency: "USD",
        auction_end_time: "2024-10-25T10:00:00Z",
        condition: "Pre-Owned",
        model: "IW371604",
        image:img11
    },
    {
        id: 12,
        name: "Cartier Santos",
        brand: "Cartier",
        description: "Luxury watch with square case and iconic design.",
        starting_bid: 4500,
        currency: "USD",
        auction_end_time: "2024-10-26T15:00:00Z",
        condition: "New",
        model: "Santos de Cartier WSSA0029",
        image:img12
    },
    {
        id: 13,
        name: "Audemars Piguet Royal Oak",
        brand: "Audemars Piguet",
        description: "High-end luxury sports watch with octagonal bezel and iconic design.",
        starting_bid: 15000,
        currency: "USD",
        auction_end_time: "2024-10-27T12:00:00Z",
        condition: "Pre-Owned",
        model: "15400ST.OO.1220ST.04",
        image:img13
    },
    {
        id: 14,
        name: "Panerai Luminor",
        brand: "Panerai",
        description: "Diver's watch with robust design and luminosity for underwater use.",
        starting_bid: 6500,
        currency: "USD",
        auction_end_time: "2024-10-28T14:00:00Z",
        condition: "New",
        model: "Luminor Base Logo 3 Days",
        image:img14
    },
    {
        id: 15,
        name: "Breguet Marine",
        brand: "Breguet",
        description: "Luxury watch inspired by nautical themes, known for precision.",
        starting_bid: 12000,
        currency: "USD",
        auction_end_time: "2024-10-29T11:00:00Z",
        condition: "Pre-Owned",
        model: "Marine Chronograph 5527",
        image:img15
    },
];
export default collection_product;