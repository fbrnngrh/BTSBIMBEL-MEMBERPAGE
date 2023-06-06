import React from "react";

import { ReactComponent as IconPlay } from "../../src/assets/images/icon-play.svg";
import { Link } from "react-router-dom";
export default function ListClassItem({ data }) {

  return (
    <div className="w-full px-4 mb-4 sm:w-1/4">
      <div className="relative item">
        <figure className="item-image">
          <IconPlay></IconPlay>
          <img src={data?.thumbnail ?? ""} alt={data?.name ?? ""} />
        </figure>
        <div className="item-meta">
          <h4 className="text-lg text-gray-900">{data?.name ?? ""}</h4>
          <h5 className="text-sm text-gray-600">{data?.level ?? ""}</h5>
        </div>
        <Link to={`/courses/${data?.id}`} className="link-wrapped"></Link>
      </div>
    </div>
  );
}
