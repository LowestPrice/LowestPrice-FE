import { MagazineProps } from '../../../type/type';
import PageFooter from '../../../components/footer/PageFooter';
import MagazineData from './magazineMainData/MagazineMainData';

const Magazine: React.FC<MagazineProps> = () => {
  return (
    <>
      <MagazineData />
      <PageFooter />
    </>
  );
};

export default Magazine;
