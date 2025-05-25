"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function PomodoroTimer() {
    const [value, setValue] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [alarmSound, setAlarmSound] = useState<HTMLAudioElement | null>(null);
    const [tiktakSound, setTiktakSound] = useState<HTMLAudioElement | null>(null);
    const [takSound, setTakSound] = useState<HTMLAudioElement | null>(null);

    const playAlarm = () => {
        if (alarmSound) {
            alarmSound.currentTime = 0;
            alarmSound.play().catch(e => {
                console.error("alarm sound play failed:", e);
            });
        }
    };

    const playTiktak = () => {
        if (tiktakSound) {
            tiktakSound.currentTime = 0;
            tiktakSound.play().catch(e => {
                console.error("tiktak sound play failed:", e);
            });
        }
    }

    const playTak = () => {
        if (takSound) {
            takSound.currentTime = 0;
            takSound.play().catch(e => {
                console.error("tak sound play failed:", e);
            });
        }
    }

    const stopSounds = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        if (alarmSound != null) {
            alarmSound.pause();
            alarmSound.currentTime = 0;
        }
        if (tiktakSound != null) {
            tiktakSound.pause();
            tiktakSound.currentTime = 0;
        }
        if (takSound != null) {
            takSound.pause();
            takSound.currentTime = 0;
        }
    }

    const changeValue = (val: number) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            stopSounds();
        }
        if (val > 0) {
            playTak();
            setValue(val);
            timeoutRef.current = setTimeout(() => changeValue(val - 1), 60 * 1000 /*1min*/);
            intervalRef.current = setInterval(playTiktak, 1000 /*1sec*/);
        } else if (val === 0) {
            setValue(prev => {
                if (prev !== 0) {
                    playTak();
                    playAlarm();
                }
                return 0;
            });
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const alarmSound = new Audio(`${process.env.NEXT_PUBLIC_BASE_PATH}/alarm.mp3`);
            alarmSound.volume = 0.2;
            setAlarmSound(alarmSound);

            const tiktakSound = new Audio(`${process.env.NEXT_PUBLIC_BASE_PATH}/tiktak.mp3`);
            tiktakSound.volume = 0.2;
            setTiktakSound(tiktakSound);

            const takSound = new Audio(`${process.env.NEXT_PUBLIC_BASE_PATH}/tak.mp3`);
            takSound.volume = 0.2;
            setTakSound(takSound);
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, []);

    const scaleTextOffsets = ["-0.75%", "7.5%", "15.2%", "23.7%", "31.8%", "40%", "48.4%", "56.9%", "65%", "73.4%", "81.7%", "90.1%"];

    return (
        <svg
            className="w-full h-full select-none drag-none"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
        >
            <defs>
                <path d="M 50,6 A 44 44 0 1 1 50 94 A 44 44 0 1 1 50,6" className="fill-none stroke-none" id="textcircle" />
            </defs>

            <g className={`transform rotate-${value * 6} origin-center duration-300 ease-linear`}>
                <foreignObject x="15" y="15" width="70" height="70">
                    <Image
                        className="select-none drag-none"
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/tomato.svg`}
                        alt="Tomato Image"
                        width={819}
                        height={819}
                        draggable="false"
                        onDragStart={(e) => e.preventDefault()}
                        onContextMenu={(e) => e.preventDefault()}
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
