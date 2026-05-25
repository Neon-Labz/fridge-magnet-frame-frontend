export type CatalogProduct = {
  id: string;
  title: string;
  desc: string;
  price: number;
  priceLabel: string;
  img: string;
  badge: string;
  frameOption: 'without-frame' | 'black-frame' | 'white-frame';
  colorOption?: string;
};

export const productCatalog: CatalogProduct[] = [
  {
    id: 'magnet-1',
    title: 'Magnet',
    desc: 'Sustainably sourced solid oak with museum-grade acrylic.',
    price: 500,
    priceLabel: 'Rs 500.00',
    img: '/product-1.png',
    badge: 'New Arrival',
    frameOption: 'without-frame',
    colorOption: undefined,
  },
  {
    id: 'magnet-2',
    title: 'Magnet Black Frame',
    desc: 'Deep matte black finish for a bold, contemporary statement.',
    price: 1000,
    priceLabel: 'Rs 1000.00',
    img: '/product-2.png',
    badge: '',
    frameOption: 'black-frame',
    colorOption: 'black',
  },
  {
    id: 'magnet-3',
    title: 'Magnet White Frame',
    desc: 'Clean white frame for a soft premium aesthetic.',
    price: 1000,
    priceLabel: 'Rs 1000.00',
    img: '/product-3.png',
    badge: '',
    frameOption: 'white-frame',
    colorOption: 'white',
  },
];
