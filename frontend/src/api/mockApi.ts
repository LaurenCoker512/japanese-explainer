import type { ApiResponse } from "./types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  async getExplanation(data: {
    word: string;
    age: number;
  }): Promise<ApiResponse> {
    await delay(300);
    const mockResponse: ApiResponse = {
      explanation:
        "もちろん！「りんご」は日本語で「林[りん]檎[ご]」と書[か]きます。「林[りん]檎[ご]」は果[くだ]物[もの]の一[ひと]つで、赤[あか]や緑[みどり]の皮[かわ]があり、甘[あま]い味[あじ]が特[とく]徴[ちょう]的[てき]です。\n\n### 「林[りん]檎[ご]」の使[つか]い方[かた]の例[れい]：\n\n1. 朝[あさ]ご飯[はん]に林[りん]檎[ご]を食[た]べました。\n2. 林[りん]檎[ご]のケーキを焼[や]きました。\n3. 学校[がっこう]の昼[ひる]休[やす]みに林[りん]檎[ご]を分[わ]けました。\n4. 林[りん]檎[ご]は体[からだ]に良[よ]い果[くだ]物[もの]です。\n\n### 「林[りん]檎[ご]」に一[いち]番[ばん]近[ちか]い言[こと]葉[ば]\n\n「林[りん]檎[ご]」に一[いち]番[ばん]近[ちか]い言[こと]葉[ば]は「アップル」（apple）です。英語[えいご]の「apple」と同[おな]じ意味[いみ]になります。\n\n### まめ知[ち]識[しき]\n\n日本[にほん]では青森[あおもり]県[けん]が林[りん]檎[ご]の生産[せいさん]で有名[ゆうめい]です。",
    };

    return mockResponse;
  },
};
