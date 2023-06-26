import { randomId } from '@mantine/hooks';

export const Category = new Array ('개발', '디자인', '공모전');
//   { label: '개발' }, 
//   { label: '디자인' }, 
//   { label: '공모전' }
// ];


export const DevelopValues = [
  { label: 'Unity', checked: false, key: randomId() },
  { label: 'C#', checked: false, key: randomId() },
  { label: 'Python', checked: false, key: randomId() },
];

export const DesignValues = [
  { label: '캐릭터', checked: false, key: randomId() },
  { label: '적', checked: false, key: randomId() },
  { label: '배경', checked: false, key: randomId() },
];

export const ContestValues = [
  { label: 'Unity 공모전', checked: false, key: randomId() },
  { label: 'C# 공모전', checked: false, key: randomId() },
  { label: 'Python 공모전', checked: false, key: randomId() },
];

export const Values = new Array(DevelopValues, DesignValues, ContestValues);