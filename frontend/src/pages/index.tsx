import { usePlayer } from '../contexts/PlayerContext';
import { api} from '../services/api';

import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

import styles from './home.module.scss';
import { useEffect, useState } from 'react';
import { Episodespage} from '../types/episodes';
import { formatLocalDate } from '../utils/format';
import Pagination from '../components/Pagination/pagination';
import LatestEpisode from '../components/LatestEpisodes/latestEpisodes';



export default function Home() {
  
const {playList} = usePlayer();
const [activePage, setActivePage] = useState(0);

const [page, setPage] = useState<Episodespage>({
    first: true,
    last: true,
    number: 0,
    numberOfElements: 0,
    totalPages: 0
});

useEffect(() => {
  api.get(`http://localhost:8080/episodes?page=${activePage}&size=5&sort=publishedAt,desc`)
      .then(response => {
          setPage(response.data);         
});    
}, [activePage]);


const changePage = (index: number) => {
  setActivePage(index);
}
 
  return (
    <>
    <div className={styles.homepage}>
      <Head>
        <title>Home | PodCorp</title>
      </Head>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>
      <LatestEpisode/>
      </section>
      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {page.content?.map((episode, index) => { 
              return (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <Image 
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{formatLocalDate(episode.publishedAt, 'dd/MM/yyyy')}</td>
                  <td>{convertDurationToTimeString(Number(episode.file.duration))}</td>
                  <td>
                  <button type="button" onClick={() => playList(page.content, index)}>
                      <img src="/play-green.svg" alt="Tocar episódio" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Pagination page={page} onPageChange={changePage}/>
      </section>
    </div> 
    </> 
      
  )
}
