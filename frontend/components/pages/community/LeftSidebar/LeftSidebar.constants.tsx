import { randomId } from '@mantine/hooks';

export const Category = new Array ('개발', '디자인', '공모전', '음악', '퍼블리싱', '인터페이스', '창업', '입문');

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

export const MusicValues = [
  { label: '배경 음악', checked: true, key: randomId() },
  { label: '효과음', checked: true, key: randomId() },
];

export const PublishingValues = [
  { label: '퍼블리싱', checked: true, key: randomId() },
];

export const InterfaceValues = [
  { label: '게임 시작', checked: true, key: randomId() },
  { label: '설정', checked: true, key: randomId() },
];

export const StartUpValues = [
  { label: '팀원 모집', checked: true, key: randomId() },
  { label: '자금', checked: true, key: randomId() },
];

export const BasicValues = [
  { label: '유니티 입문', checked: true, key: randomId() },
  { label: '얼리얼 입문', checked: true, key: randomId() },
];

export const Values = new Array(DevelopValues, DesignValues, ContestValues, MusicValues, PublishingValues, InterfaceValues, StartUpValues, BasicValues);

let a = Category.length;
let b = Values.length;
export const CategoryNum = a == b? a: (a > b? b: a);