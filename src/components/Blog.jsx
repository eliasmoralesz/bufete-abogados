import React from 'react';
import { useTranslation } from 'react-i18next';
import './Blog.css';

const Blog = () => {
  const { t } = useTranslation();

  return (
    <section id="blog">
      <h2>{t('blog')}</h2>
      <p>{t('blogText')}</p>
    </section>
  );
};

export default Blog;