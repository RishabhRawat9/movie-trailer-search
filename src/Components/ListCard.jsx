import React from "react";
import { Link } from "react-router-dom";

function ListCard(props) {
  const { id, listName, description } = props;
  return (
    <Link to={`/lists/${id}`}>
      {" "}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow m-5  w-64 h-32">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{listName}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {description || "No description"}
        </p>
      </div>
    </Link>
  );
}

export default ListCard;
