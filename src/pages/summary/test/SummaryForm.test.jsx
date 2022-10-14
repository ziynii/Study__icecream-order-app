import { render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test('Inital conditions', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  // 초기에는 체크박스에 체크x
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole('button', { name: /confirm order/i });
  // 체크박스가 활성화 되지 않아서 confirm 버튼도 비활성화
  expect(confirmButton).toBeDisabled();
});

test('Checkbox disables button on first click and enables on second click', async () => {
  render(<SummaryForm />);
  const user = userEvent.setup();

  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole('button', { name: /confirm order/i });

  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();

  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test('popover responds to hover', async () => {
  render(<SummaryForm />);
  const user = userEvent.setup();

  // popover는 처음에 보이지 않음
  // 무언가가 표시되지 않음을 확인하기 위해서는 getBy는 사용불가
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // checkbox label에 mouseover시 popover가 보인다
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // 마우스를 떼면 popover는 사라짐
  await user.unhover(termsAndConditions);
  const nullPopoverAgain = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopoverAgain).not.toBeInTheDocument();
});
