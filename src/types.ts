export interface ActionType {
  type: 'error' | 'fetching' | 'loaded';
  image?: string;
}

export type StateType = {
  hasLoaded: boolean;
  hasError: boolean;
  isFetching: boolean;
  image: string;
};
