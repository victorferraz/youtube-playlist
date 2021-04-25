import Playlist from '../index';
import { PlayListType } from '../types';

const channels = ['Freecodecamp', 'RocketSeat', 'TechWorldwithNana'];

channels.forEach((channel) => {
  describe(`playlist test ${channel}`, () => {
    const playlist = new Playlist();
    let urlData: string;
    let playlistCode: PlayListType[];
    let playListItem: PlayListType;

    beforeAll(async () => {
      urlData = await playlist.getUrlData(`https://www.youtube.com/c/${channel}/playlists`);
      playlistCode = await playlist.run(channel);
      playListItem = (playlistCode && playlistCode[0]) ?? {};
    });

    test('url information should be defined', () => {
      expect(urlData).toBeDefined();
    });

    test('playlist code should be defined', () => {
      expect(playlistCode).toBeDefined();
    });

    test('playlist code should be array', () => {
      expect(Array.isArray(playlistCode)).toBeTruthy();
    });

    test('playlist code should be more than one', () => {
      expect(playlistCode.length).toBeGreaterThan(0);
    });

    test('playlist code should have the right type values', () => {
      console.log(playListItem);
      expect(playListItem.thumbnails[0].url).toBeDefined();
      expect(playListItem.url).toBeDefined();
      expect(playListItem.title).toBeDefined();
    });

    it('should be wrong', async () => {
      await expect(async () => await playlist.getUrlData('test')).rejects.toThrow();
    });

    it('should bring url data', async () => {
      expect(urlData).toBeDefined();
    });
  });
});
