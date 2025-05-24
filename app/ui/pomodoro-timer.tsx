"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function PomodoroTimer() {
    const [value, setValue] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [alarmSound, setAlarmSound] = useState<HTMLAudioElement | null>(null);

    const playAlarm = () => {
        alarmSound?.play().catch(e => {
            console.error("Alarm play failed - user interaction required:", e);
        });
    };

    const changeValue = (val: number) => {
        console.log(value, val);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        if (val > 0) {
            setValue(val);
            timeoutRef.current = setTimeout(() => changeValue(val - 1), 5 * 1000 /*1min*/);
        } else if (val === 0) {
            setValue(prev => {
                if (prev !== 0) {
                    playAlarm();
                }
                return 0;
            });
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const sound = new Audio(`${process.env.NEXT_PUBLIC_BASE_PATH}/alarm.mp3`);
            setAlarmSound(sound);
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);

    const scaleTextOffsets = ["-0.75%", "7.5%", "15.2%", "23.7%", "31.8%", "40%", "48.4%", "56.9%", "65%", "73.4%", "81.7%", "90.1%"];

    return (
        <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <path d="M 50,6 A 44 44 0 1 1 50 94 A 44 44 0 1 1 50,6" className="fill-none stroke-none" id="textcircle" />
            </defs>

            <g className={`transform rotate-${value * 6} origin-center duration-1000 ease-linear`}>
                <foreignObject x="15" y="15" width="70" height="70">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/tomato.svg`}
                        alt="Tomato Image"
                        width={819}
                        height={819}
                    />
                </foreignObject>
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
