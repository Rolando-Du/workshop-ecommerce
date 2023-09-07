import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import './Home.css'
const Home = () => {
  const [images, setImages] = useState([]);


  useEffect(() => {
    const imageNames = [
      "Candelabro1.jpg",
      "Almohada2.jpg",
      "CuadroModerno.jpg",
      "Florero2.jpg", "Almohada6.jpg",
      "Lampara.jpg",
      "Rack3.jpg",
      "Lampara2.jpg",
      "Rack6.jpg"
    ];
    setImages(imageNames);
  }, []);

  const uniqueImages = (images) => {
    return images.filter((image, index, array) => {
      return array.indexOf(image) === index;
    });
  };

  return (
    <div className='container'>
      <h1 className="text-center">Los mejores productos</h1>
      <div className="container-cart">
        <div className="flex">
          {uniqueImages(images).map((image, index) => (
            <div
              key={image}
              className={`col-md-3 col-sm-4 col-12${index < 4 ? " mt-4" : ""} card-container`}
            >
              <Link to="/ItemListContainer">
                <img
                  src={`/assets/images/${image}`}
                  alt="Imagen"
                  className="image"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;


