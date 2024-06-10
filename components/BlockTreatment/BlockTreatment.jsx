import Image from "next/image"

export default function BlockTreatment({ image }) {
    return <div className={`w-64 h-32 relative`}>
        <Image alt='' src={image.src} fill={true} style={{objectFit: 'contain'}} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true}/>
    </div>
}