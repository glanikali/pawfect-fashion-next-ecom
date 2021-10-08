import React, { useEffect, useState } from "react";
import { Image } from "next/image";
import { useSelector } from "react-redux";

import styles from "./Bandana.module.scss";

const getX = (customText) => {
  if (customText.length === 6) {
    return "191";
  } else if (customText.length === 7) {
    return "175";
  } else if (customText.length === 8) {
    return "160";
  } else return "207.547";
};
//15.849

const URL = (url) => {
  return url.length > 1
    ? url
    : "https://media.pawfectfashion.com/wp-content/uploads/2021/09/purple-hearts.png";
};
const Bandana = (props) => {
  return (
    <div style={{ width: `${props.width ? props.width+"px" : '100%'}` }}>
      <svg key={props.id} viewBox="0 0 565 565" fill="none">
        <defs>
          <pattern
            id={props.id}
            patternUnits="userSpaceOnUse"
            width="500"
            height="500"
          >
            <image
              href={URL(props.mediaURL)}
              height={500}
              width={500}
              x={0}
              y={0}
            />
          </pattern>
        </defs>

        <g id="bandana2.2 1">
          <g id="bandana">
            <g id="bandanatop" className={styles.bandanatop}>
              <path
                id="Vector"
                d="M53.54 183.95L182.11 83.68C182.11 83.68 195.27 72.84 189.08 90.65C182.89 108.46 156.56 183.95 156.56 183.95H53.54Z"
                fill={`url(#${props.id})`}
              />
              <path
                id="Vector_2"
                d="M511.4 183.95L382.83 83.68C382.83 83.68 369.67 72.84 375.86 90.65C382.05 108.46 408.38 183.95 408.38 183.95H511.4Z"
                fill={`url(#${props.id})`}
              />
            </g>
            <g id="mainbandana" className={styles.mainBandana}>
              <path
                id="Vector_3"
                d="M511.4 350.85H53.54V183.95H511.4V350.85ZM511.4 350.85H53.54C280.26 484.52 280.26 484.52 280.26 484.52L511.4 350.85Z"
                fill={`url(#${props.id})`}
              />
            </g>
          </g>
          <g id="logo">
            <path
              id="Vector_4"
              d="M400.624 385.387L282.465 452.323L293.979 472.648L412.139 405.712L400.624 385.387Z"
              fill="black"
            />
            <path
              id="Vector_5"
              d="M398.721 390.263L287.131 453.477L295.131 467.599L406.721 404.385L398.721 390.263Z"
              stroke="#FFDE17"
              strokeMiterlimit="10"
              strokeDasharray="3 3"
            />
            <text
              id="PAWFECT FASHION"
              transform="translate(309.916 442.175) rotate(-29.531)"
              fill="#FEDE10"
              stroke="black"
              strokeMiterlimit="10"
              fontFamily="Chewy"
              fontSize="11.0987"
              letterSpacing="0em"
            >
              <tspan x="0" y="11.2556">
                PAWFECT FASHION
              </tspan>
            </text>
          </g>
          <g id="name">
            <text
              id={props.customText}
              fill="white"
              fontFamily="Chewy"
              fontSize="72"
              letterSpacing="0em"
              textAnchor="start"
            >
              <tspan x={getX(props.customText)} y="322.363" textAnchor="start">
                {props.customText}
              </tspan>
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Bandana;

{
  /* <svg viewBox="0 0 439 267" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="439" height="267" />
<path d="M0 0H439V164H0V0Z" fill={`${pattern ? pattern : "black"}`} />
<path
  d="M220 267L1.76159 163.5L438.238 163.5L220 267Z"
  fill={`${pattern ? pattern : "black"}`}
/>
</svg> */
}
