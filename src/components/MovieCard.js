import React from 'react';
import Observer from 'react-intersection-observer';

// const posterPlaceHolder = '/placeholder.jpg';

const MovieCard = ({ year, title, genre , description, director}) => (
  <Observer>
    {({ inView, ref }) => (
       <div ref={ref} className="col-md-3">
       <div className="card mb-3 shadow-sm">
         <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
         <div className="card-body">
          <h4 className="card-title text-left">{title}</h4>
          <p className=" text-left genre-title">{year}-{genre.join("/")}</p>
           <p className="card-text text-left">{description}</p>
           <ul className="list"><li><strong>Release date:</strong> {year}</li><li><strong>Director:</strong> {director}</li></ul>
        
           
         </div>
       </div>
     </div> 
       
    )}
  </Observer>
);

export default MovieCard;
