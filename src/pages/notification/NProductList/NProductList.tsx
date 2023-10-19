import NProductItem from './NProductItem';

type Props = {};

export default function NProductList({}: Props) {
  return (
    <div>
      <NProductItem></NProductItem>
      <NProductItem></NProductItem>
      <NProductItem></NProductItem>
    </div>
  );
}
