import { Helmet } from 'react-helmet-async';

import MagazineWritingData from './MagazineWritingData';

const MagazineWriting = () => {
  return (
    <>
      <Helmet title='내일은 최저가 | 매거진 작성' />
      <MagazineWritingData />
    </>
  );
};

export default MagazineWriting;
