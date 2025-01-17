import React from "react";
import { useGlobleContext } from "./context";
import "./App.css";

const Stories = () => {
  const { hits, isLoading, removePost } = useGlobleContext();
  if (isLoading) {
    return (
      <>
        <h2 className="loading">Loading...</h2>
      </>
    );
  }
  return (
    <>
      <div className="stories-div">
        {hits.map((currPost) => {
          const { title, author, objectID, url, num_comments } = currPost;
          return (
            <div className="card" key={objectID}>
              <h2>{title}</h2>
              <p>
                By <span> {author}</span> | <span> {num_comments} </span>{" "}
                comments
              </p>
              <div className="card-button">
                <a href={url} target="_blank">
                  Read More
                </a>
                <a href="#" onClick={() => removePost(objectID)}>
                  Remove
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Stories;
