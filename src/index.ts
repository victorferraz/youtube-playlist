import got from 'got';
import { PlayListType } from './types';
var util = require('util');

class Playlist {

  async run(channel:string): Promise<PlayListType[]> {
    const siteData = await this.getUrlData(`https://www.youtube.com/c/${channel}/playlists`);
    const data = this.getPlaylist(siteData);
    return data;
  }

  getTagScriptFromHtml(html:string){
    return html.match(/<script(.*?)\>(.*?)\<\/script\>/g);
  }

  getPlaylist(html:string): PlayListType[] {
    const scriptList = this.getTagScriptFromHtml(html);
    let playList: PlayListType[]| undefined = [];
    scriptList?.forEach((item) => {
      const text: string | null = item;
      const hasPlaylistData = text?.includes('ytInitialData') && text?.includes('responseContext');
      if (hasPlaylistData && text){
        playList = this.extractObject(text);
      }
    });
    return playList;
  }

  getPlaylistObject (data:any): PlayListType[] {
    const result = findVal(data, 'items');
    return this.formatHtml(result);
  }

  formatHtml(data: any){
    return data.reduce((acc: any, item: any)=> {
      const element = item.gridPlaylistRenderer;
      const data:any = {};
      data.thumbnails = element.thumbnail?.thumbnails;
      data.title = element.title.runs[0]?.text;
      acc.push(data);
      return acc;
    }, []);
  }

  extractObject(text:string){
    const myRegex = /\{+(.*)+}/sm;
    const groups: RegExpMatchArray | null = text.match(myRegex);
    if (groups && groups.length > 0){
      const clean = groups[0].replace(/\n/g, '<br>');
      const parse = JSON.parse(clean);
      return this.getPlaylistObject(parse);
    }
  }

  async getUrlData (url: string) {
    try {
      const response = await got(url);
      return response.body;
    } catch (error) {
      throw new Error(`invalid url`);
    }
  }
}

export default Playlist;

function findVal(object:any, key:any) {
  var value;
  Object.keys(object).some((k) => {
      if (k === key) {
          value = object[k];
          return true;
      }
      if (object[k] && typeof object[k] === 'object') {
          value = findVal(object[k], key);
          return value !== undefined;
      }
  });
  return value;
}
