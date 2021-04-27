import Playlist from './lib/';
import { PlayListType } from './lib/types';

function runPlaylist(channel: string): Promise<PlayListType[]> {
  return new Playlist().run(channel);
}

export default runPlaylist;
