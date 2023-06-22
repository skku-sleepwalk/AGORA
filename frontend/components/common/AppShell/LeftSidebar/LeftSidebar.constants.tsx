import { randomId } from '@mantine/hooks';

export const CategoryValues = [
  { label: '개발' },
  { label: '디자인' },
  { label: '공모전' },
];

export const DevelopValues = [
  { label: 'Unity', checked: false, key: randomId() },
  { label: 'C#', checked: false, key: randomId() },
  { label: 'Python', checked: false, key: randomId() },
];