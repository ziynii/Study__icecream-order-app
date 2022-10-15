import { render, screen } from '@testing-library/react';
import Options from '../Options';

test('display image for each scope option from server', async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });

  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((image) => image.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('display image for each toppings option from server', async () => {
  render(<Options optionType="toppings" />);

  // find images
  const toppingImages = await screen.findAllByRole('img', {
    name: /topping$/i,
  });

  expect(toppingImages).toHaveLength(3);

  // confirm alt text of images
  const altText = toppingImages.map((image) => image.alt);
  expect(altText).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});
