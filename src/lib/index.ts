import got from 'got';
import { PlayListType } from './types';

class Playlist {
  async run(channel: string): Promise<PlayListType[]> {
    const siteData = await this.getUrlData(`https://www.youtube.com/c/${channel}/playlists`);
    const data = this.getPlaylistObject(siteData);
    return data;
  }

  static async getPlaylist(channel: string): Promise<PlayListType[]> {
    return await new Playlist().run(channel);
  }

  getTagScriptFromHtml(html: string): RegExpMatchArray | null {
    return html.match(/<script(.*?)\>(.*?)\<\/script\>/g);
  }

  getPlaylistObject(html: string): PlayListType[] {
    const scriptList = this.getTagScriptFromHtml(html);
    let playList: PlayListType[] | undefined = [];
    scriptList?.forEach((item) => {
      const text: string | null = item;
      const hasPlaylistData = text?.includes('ytInitialData') && text?.includes('responseContext');
      if (hasPlaylistData && text) {
        playList = this.extractObject(text);
      }
    });
    return playList;
  }

  findObjectPattern(data: any): PlayListType[] {
    const result = this.findVal(data, 'items');
    return this.formatHtml(result);
  }

  formatHtml(data: any): PlayListType[] {
    return data.reduce((acc: any, item: any) => {
      const element = item.gridPlaylistRenderer;
      const object: any = {};
      object.thumbnails = element.thumbnail?.thumbnails;
      object.title = element.title.runs[0]?.text;
      object.url = `https://www.youtube.com/playlist?list=${element.playlistId}`;
      acc.push(data);
      return acc;
    }, []);
  }

  extractObject(text: string): PlayListType[] | undefined {
    const myRegex = /\{+(.*)+}/ms;
    const groups: RegExpMatchArray | null = text.match(myRegex);
    if (groups && groups.length > 0) {
      const clean = groups[0].replace(/\n/g, '<br>');
      const parse = JSON.parse(clean);
      return this.findObjectPattern(parse);
    }
  }

  async getUrlData(url: string) {
    try {
      const response = await got(url);
      return response.body;
    } catch (error) {
      throw new Error(`invalid url`);
    }
  }

  findVal(object: any, key: any) {
    let value;
    Object.keys(object).some((k) => {
      if (k === key) {
        value = object[k];
        return true;
      }
      if (object[k] && typeof object[k] === 'object') {
        value = this.findVal(object[k], key);
        return value !== undefined;
      }
    });
    return value;
  }
}

export default Playlist;
