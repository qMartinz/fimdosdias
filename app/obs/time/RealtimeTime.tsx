'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

export default function RealTimeViewer({ scene }: any) {
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            router.refresh();
        }, 500);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <div className='info'>
            <Image src={'/dia.png'} alt='' width='88' height='87' />
            <p>DIA <span className='number'>{scene.day}</span></p>
            <Image src={'/tempo.png'} alt='' width='67' height='58' />
            <p>HORÁRIO <span className='number'>{scene.time}</span></p>
        </div>
    )
}