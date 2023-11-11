import MagazineData from './magazineMainData/MagazineMainData';
import PageFooter from '../../../components/footer/PageFooter';

import { MagazineProps } from '../../../type';

const Magazine: React.FC<MagazineProps> = () => {
  return (
    <>
      <MagazineData />
      <PageFooter />
    </>
  );
};

export default Magazine;
