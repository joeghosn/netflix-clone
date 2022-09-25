import styles from  './cardSection.module.css';
import Link from 'next/link';
//imported Components:
import Card from '../card/card';


const CardSection=({sectionTitle='Movies', movies=[], size})=>{
   
return (
    <section className={styles.container}>
        <h2 className={styles.title}>{sectionTitle}</h2>

        <div className={styles.cardWrapper}>
            {
                movies.map((movie)=>{
                   

                    return(
                        <Link  key={movie.id} href={`/video/${movie.id}`}>
                            <a>
                            <Card videoId={movie.videoId} id={movie.id} thumbnail={movie.thumbnail} size={size} title={movie.title} description={movie.description} publishedDate={movie.publishedDate}/>
                            </a>
                      
                        </Link>
                       
                    );
                })
            }

{/* {cards} */}
        </div>``


    </section>
);

}

export default CardSection;