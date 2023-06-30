import { randomId } from '@mantine/hooks';

export const Category = new Array ('개발', '디자인', '공모전');
export const CategoryNum = 3; // 위의 카테고리 개수와 같도록

export const DevelopValues = [
  { label: 'Unity', checked: true, key: randomId() },
  { label: 'C#', checked: true, key: randomId() },
  { label: 'Python', checked: true, key: randomId() },
];

export const DesignValues = [
  { label: '캐릭터', checked: true, key: randomId() },
  { label: '적', checked: true, key: randomId() },
  { label: '배경', checked: true, key: randomId() },
];

export const ContestValues = [
  { label: 'Unity 공모전', checked: true, key: randomId() },
  { label: 'C# 공모전', checked: true, key: randomId() },
  { label: 'Python 공모전', checked: true, key: randomId() },
];

export const Values = new Array(DevelopValues, DesignValues, ContestValues);