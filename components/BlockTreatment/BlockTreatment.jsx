import Image from "next/image"
import styles from "./BlockTreatment.module.css"

export default function BlockTreatment({ image }) {
    return <div className={styles.container}>
        <Image alt='' src={image.src} fill={true} style={styles.image} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true}/>
    </div>
}