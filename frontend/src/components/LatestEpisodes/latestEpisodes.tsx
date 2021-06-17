import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import { Episodespage } from '../../types/episodes';
import styles from '../../pages/home.module.scss';
import { api } from '../../services/api';
import { formatLocalDate } from '../../utils/format';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';


export default function LatestEpisode(){
    const { playList } = usePlayer()

    useEffect(() => {
        api.get(`/episodes?page=0&size=4&sort=publishedAt,desc`)
            .then(response => {
                setPage(response.data);
                console.log(response.data);
            })   
              
        },[]);       

    const [page, setPage] = useState<Episodespage>({
        first: true,
        last: true,
        number: 0,
        numberOfElements: 0,
        totalPages: 0
            
    });

    return(
        <ul>
        {page.content?.map((item, index) => {
          return (
            <li key={item.id}>
              <Image 
                width={192} 
                height={192} 
                src={item.thumbnail} 
                alt={item.title} 
                objectFit="cover"
                
              />
               
                
              <div className={styles.episodeDetails}>
                <Link href={`/episodes/${item.id}`}>
                  <a>{item.title}</a>
                </Link>
                <p>{item.members}</p>
                <span>{formatLocalDate(item.publishedAt, "dd/MM/yyyy")}</span>
                <span>{convertDurationToTimeString(Number(item.file.duration))}</span>
              </div>
              <button type="button" onClick={() => playList(page.content, index)}>
                      <img src="/play-green.svg" alt="Tocar episódio" />
                    </button>
               </li>
            )
        })}
      </ul>
    

      
    )
}