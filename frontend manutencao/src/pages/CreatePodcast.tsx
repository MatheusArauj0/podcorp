import '../styles/pages/create-podcast.css';
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const data = new Date();
var dia = String(data.getDate()).padStart(2, '0');
var mes = String(data.getMonth() + 1).padStart(2, '0');
var ano = data.getFullYear();
var hora = String(data.getHours()).padStart(2, '0');
var minutos = String(data.getMinutes()).padStart(2, '0');
var segundos = String(data.getSeconds()).padStart(2, '0');
var hhmmss = [hora, minutos, segundos].join(':');
var yyyymmdd = [ano, mes, dia].join('-');

const initialValue = {
  title: '',
  members: '',
  publishedAt: yyyymmdd + 'T' + hhmmss + 'Z',
  thumbnail: '/fotos/',
  description: '',
  file: {
    url: '',
    type: '',
    duration: 0,
  }
}

export default function CreatePodcast() {


  const [values, setValues] = useState(initialValue);
  const [image, setImage] = useState<File[]>();
  const [audio, setAudio] = useState<File[]>();

  function onChange(ev: any) {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value });
  }

  function handleDuration(event:ChangeEvent<HTMLInputElement> ) {
    var numero = event.target.value;
    values.file.duration = Number(numero);
  }

  function handleSelectImage(event: ChangeEvent<HTMLInputElement>) {
    var files = event.target.files;
    var f = files[0];
    values.thumbnail = '/fotos/' + f.name;

    if (!event.target.files) {
      return;
    }

    const selectImage = Array.from(event.target.files);

    setImage(selectImage);
  }

  function handleSelectAudio(event: ChangeEvent<HTMLInputElement>) {
    var files = event.target.files;
    var f = files[0];
    values.file.url = '/audios/' + f.name;
    values.file.type = f.type

    if (!event.target.files) {
      return;
    }

    const selectAudio = Array.from(event.target.files);

    setAudio(selectAudio);
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const foto = new FormData();
    const sound = new FormData();

    image?.forEach(image => {
      foto.append('foto', image);
    });

    audio?.forEach(audio => {
      sound.append('audio', audio);
    });

    await axios.post('http://localhost:8080/episodes/fotos', foto);
    await axios.post('http://localhost:8080/episodes/audios', sound);
    await axios.post('http://localhost:8080/episodes', values);
    alert('Upload realizado');
  }

  return (
    <div id="page-create-podcast">
      <main>
        <form
          onSubmit={handleSubmit}
          className="create-podcast-form"
          id="form-id"
        >
          <fieldset>
            <legend>Dados</legend>
            <div className="input-block">
              <label htmlFor="title" className="required">Titulo</label>
              <input
                name="title"
                type="text"
                className=""
                id="title"
                onChange={onChange}
                required
              />
            </div>
            <div className="input-block">
              <label htmlFor="members" className="required">Membros</label>
              <input
                name="members"
                type="text"
                className=""
                id="members"
                onChange={onChange}
                required
              />
            </div>
            <div className="input-block">
              <label htmlFor="description" className="required">Descrição</label>
              <textarea
                id="description"
                name="description"
                onChange={onChange}
                required
              />
            </div>
            <div className="input-block">
              <label htmlFor="thumbnail" className="required">Thumbnail</label>
              <input
                type="file"
                className="new-image"
                id="image"
                accept="image/*"
                onChange={handleSelectImage}
                required
              />
            </div>
            <div className="input-block">
              <label htmlFor="podcast" className="required">Podcast</label>
              <input
                id="audio"
                name="audio"
                type="file"
                accept="audio/*"
                onChange={handleSelectAudio}
                required
              />
            </div>
            <div className="input-block">
              <label htmlFor="title" className="required">Duração em segundos </label>
              <input
                name="duration"
                type="number"
                className="duration"
                id="duration"
                onChange={handleDuration}
                required
              />
            </div>      
          </fieldset>
          <input
            id="button-id"
            className="confirm-button"
            type="submit"
          />
        </form>
      </main>
    </div>
  );
}