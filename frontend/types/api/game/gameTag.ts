export interface GameTag {
  id: string;
  name: string;
}

export interface GameTagResponse {
  data: GameTag[];
}

export interface MyGameTag {
  id: string;
  tag: GameTag;
}

export interface MyGameTagResponse {
  data: MyGameTag[];
}

export interface GameTagName {
  tagName: string;
}

export interface PostGameTagResponse {
  data: null;
}
