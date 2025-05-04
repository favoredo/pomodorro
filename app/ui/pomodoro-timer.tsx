"use client";

import { useState } from 'react';

export default function PomodoroTimer() {
    const [value, setValue] = useState(0);
    let timeout: NodeJS.Timeout | null = null;

    const changeValue = (val: number) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        if (val > 0) {
            setValue(val);
            timeout = setTimeout(() => {console.log(val); changeValue(val-1)}, 60*1000 /*1min*/);
        }
        if (val === 0) {
            setValue(val);
            console.log("Timedout!");
        }
    }

    const scaleTextOffsets = ["-0.75%", "7.5%", "15.2%", "23.7%", "31.8%", "40%", "48.4%", "56.9%", "65%", "73.4%", "81.7%", "90.1%"];

    return (
        <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <svg
                    id="pomodoro"
                    width="100mm"
                    height="100mm"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg">

                    {/* pomodoro */}
                    <defs>
                        <linearGradient id="prefix__b">
                            <stop offset="0" stopColor="#1ca64f" />
                            <stop offset=".294" stopColor="#178741" />
                            <stop offset="1" stopColor="#14532d" />
                        </linearGradient>
                        <linearGradient id="prefix__c">
                            <stop offset=".394" stopColor="#178741" />
                            <stop offset="1" stopColor="#14532d" />
                        </linearGradient>
                        <linearGradient id="prefix__a">
                            <stop offset=".725" stopColor="#ef4444" />
                            <stop offset="1" stopColor="#f59e0b" />
                        </linearGradient>
                        <linearGradient xlinkHref="#prefix__a" id="prefix__d" x1="80.307" y1="20.732" x2="19.693" y2="79.268"
                            gradientUnits="userSpaceOnUse" gradientTransform="matrix(1.18674 0 0 1.18674 -9.337 -9.337)" />
                        <linearGradient xlinkHref="#prefix__b" id="prefix__f" x1="117.664" y1="95.819" x2="100.451" y2="97.325"
                            gradientUnits="userSpaceOnUse" />
                        <radialGradient xlinkHref="#prefix__c" id="prefix__e" cx="103.398" cy="97.845" fx="103.398" fy="97.845"
                            r="57.83" gradientTransform="matrix(1 0 0 1.10673 0 -10.443)" gradientUnits="userSpaceOnUse" />
                    </defs>
                    {/* pomodoro body */}
                    <circle cx="50" cy="50" fill="url(#prefix__d)" stroke="#7f1d1d" strokeWidth=".319" r="49.65" />
                    {/* pomodoro leaves */}
                    <path
                        d="M45.754 128.194c5.754-2.508 26.59-12.734 34.522-15.045 3.938-1.148 6.27-.625 9.171-1.443 2.79-.787 5.94-4.513 7.935-3.298 4.492 2.736 1.74 34.138 3.607 43.384.907 4.497 2.035 9.872 3.194 9.79 2.686-.19 1.515-50.84 9.584-54.41 6.088-2.693 20.152 13.583 26.587 16.797 3.386 1.69 5.435 1.633 8.14 3.091 3.102 1.671 7.6 4.887 9.275 6.698.825.893 1.257 1.367 1.443 2.37.268 1.447-1.252 5.6-1.03 5.668.243.075 2.804-4.483 2.782-6.389-.019-1.558-.778-2.394-1.958-4.225-2.866-4.447-11.617-14.756-17.931-20.816-5.827-5.592-18.283-9.702-18.343-14.53-.058-4.652 12.588-9.123 16.694-13.912 3.248-3.786 8.086-10.435 7.008-11.644-1.638-1.837-25.165 15.429-28.545 12.984-2.283-1.65 1.327-9.01 1.546-14.22.264-6.318.592-14.811-.516-21.023-.926-5.193-3.58-14.04-4.74-13.912-1.418.157-.907 15.059-2.37 21.847-1.332 6.18-4.294 12.878-5.668 17.312-.85 2.745-.375 6.267-1.958 6.699-3.272.892-15.029-14.703-21.743-20.404-5.355-4.547-11.39-9.038-15.046-11.542-1.977-1.355-3.163-2.626-4.74-2.885-1.376-.226-4.104.546-4.122.927-.019.401 2.923.473 4.431 1.443 2.233 1.436 5.073 4.753 6.905 7.523 1.787 2.704 2.22 5.493 4.019 8.862 2.587 4.845 7.324 11.902 10.614 17.106 2.788 4.411 8.757 8.98 7.832 12.16-1.018 3.495-11.036 4.353-15.87 7.316-4.646 2.848-8.194 6.048-12.675 9.996-5.61 4.942-15.028 14.77-18.034 17.725"
                        transform="matrix(.59337 0 0 .59337 -9.337 -9.337)" fill="url(#prefix__e)" stroke="#14532d"
                        strokeWidth="1"
                    />
                    {/* pomodoro stem */}
                    <path
                        d="M105.064 91.538a5.273 5.273 0 00-3.816 2.75 5.059 5.059 0 00-.52 2.984 4.76 4.76 0 001.341 2.709c.965.957 2.322 1.443 3.674 1.58 1.353.136 2.716-.048 4.057-.268a74.53 74.53 0 005.684-1.162 5.103 5.103 0 001.948-3.977 5.107 5.107 0 00-2.033-4.031z"
                        transform="matrix(.29668 -.51387 .51387 .29668 -26.795 71.982)" fill="url(#prefix__f)" stroke="#14532d"
                        strokeWidth="1"
                    />
                </svg>

                <path d="M 50,6 A 44 44 0 1 1 50 94 A 44 44 0 1 1 50,6" className="fill-none stroke-none" id="textcircle" />
            </defs>

            <g transform={"rotate(" + value * 6 + " 50 50 )"} className="duration-1000">
                <use href="#pomodoro" x="15" y="15" width="70" height="70" transform="rotate(-45 50 50)" />
                {/* arrow */}
                <polygon points="50 16 48 21 52 21" className="fill-foreground stroke-none" />
            </g>
            {/* scale */}
            {
                [...Array(12)].map((e, i) => (
                    <line
                        key={"big_dash_" + i}
                        x1={50} y1={9}
                        x2={50} y2={14}
                        className="fill-none stroke-foreground"
                        strokeWidth={0.5}
                        transform={"rotate(" + 30 * i + " 50 50)"}
                        onClick={() => changeValue(5 * i)}
                    />
                ))
            }
            {
                [...Array(60)].map((e, i) => (
                    <line key={"small_dash_" + i}
                        x1={50} y1={11}
                        x2={50} y2={14}
                        className="stroke-foreground fill-none"
                        strokeWidth={0.25}
                        transform={"rotate(" + 6 * i + " 50 50)"}
                        onClick={() => changeValue(i)}
                    />
                ))
            }
            {/* scale text */}
            {
                [...Array(12)].map((e, i) => (
                    <text key={"scale_text_" + i}
                        className="fill-foreground stroke-none antialiased text-[7px] font-mono"
                        onClick={() => changeValue(5 * i)}
                    >
                        <textPath xlinkHref="#textcircle" startOffset={scaleTextOffsets[i]}>{5 * i}</textPath>
                    </text>
                ))
            }
        </svg>
    )
}
