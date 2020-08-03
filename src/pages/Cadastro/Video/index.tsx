import React, { useState, useEffect } from 'react';

import api from '../../../services/api';

import { useForm } from '../../../hooks/useForm';

import Input from '../../../components/Input';
import { SubmitButton } from '../../../_layout/CadastroLayout';

interface IVideoInfo {
  title: string;
  url: string;
  category: string;
  description?: string;
}

const initialVideoInfo: IVideoInfo = {
  title: '',
  url: '',
  category: '',
  description: '',
};

const CadastroVideo: React.FC = () => {
  const [videoInfo, setVideoInfo, resetVideoInfo] = useForm<IVideoInfo>(
    initialVideoInfo
  );

  const [categories, setCategories] = useState<DataCategory[]>([]);

  useEffect(() => {
    (async () => {
      const categoriesResponse = await api.get<DataCategory[]>('categorias');

      setCategories(categoriesResponse.data);
    })();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const categoryTrimmed = videoInfo.category.trim();

    const category = categories.find(
      ctg => ctg.titulo.toLowerCase() === categoryTrimmed.toLowerCase()
    );

    if (!category) {
      return;
    }

    resetVideoInfo();
    document
      .querySelectorAll('.filled')
      .forEach(elem => elem.classList.remove('filled'));

    api.post('videos', {
      categoriaId: category.id,
      titulo: videoInfo.title.trim(),
      description: videoInfo.description?.trim(),
      url: videoInfo.url.trim(),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value) {
      e.target.classList.add('filled');
    } else {
      e.target.classList.remove('filled');
    }

    setVideoInfo(e.target);
  };

  return (
    <>
      <h1>Cadastro de Vídeo</h1>

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          label="Título"
          id="video-title"
          value={videoInfo.title}
          onChange={handleInputChange}
          required
        />

        <Input
          type="text"
          name="description"
          label="Descrição (opcional)"
          id="video-desc"
          value={videoInfo.description}
          onChange={handleInputChange}
        />

        <Input
          type="url"
          name="url"
          label="URL"
          id="video-url"
          value={videoInfo.url}
          onChange={handleInputChange}
          required
        />

        <Input
          type="text"
          name="category"
          label="Categoria"
          id="video-category"
          value={videoInfo.category}
          onChange={handleInputChange}
          autoComplete="off"
          required
          list="video-categories-list"
        >
          <datalist id="video-categories-list">
            {categories.map(category => (
              <option key={category.id} value={category.titulo}>
                {category.titulo}
              </option>
            ))}
          </datalist>
        </Input>

        <SubmitButton type="submit">Cadastrar</SubmitButton>
      </form>
    </>
  );
};

export default CadastroVideo;
