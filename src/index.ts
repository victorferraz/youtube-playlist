import Playlist from './lib/';

export default (channel:string)=>{
  return new Playlist().run(channel);
}
