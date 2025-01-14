'use client';
import PocketBase from 'pocketbase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const pb = new PocketBase('http://127.0.0.1:8090');

export default function RealTimeViewer({ scene }: any) {
    const router = useRouter();

    pb.collection('scenes').subscribe('000000000000000', function (e) {
        router.refresh();
    }, {});

    return (
        <div className='info'>
            <Image src={'/dia.png'} alt='' width='88' height='87'/>
            <p>DIA <span className='number'>{scene.day}</span></p>
            <Image src={'/tempo.png'} alt='' width='67' height='58'/>
            <p>HORÁRIO <span className='number'>{scene.time}</span></p>
        </div>
    )
}