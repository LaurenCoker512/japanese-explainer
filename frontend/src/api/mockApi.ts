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
        "## 言葉[ことば]の説明[せつめい]\n\n「りんご」は赤[あか]や緑[みどり]色[いろ]をした果物[くだもの]です。甘[あま]くて、しゃきしゃきした食感[しょっかん]があります。日本[にほん]でもよく食[た]べられています。\n\n## 使[つか]い方[かた]の例[れい]\n\n1. 母[はは]：「今日[きょう]はおやつにりんごを切[き]っておいたよ。」\n   子[こ]：「やった！りんご大好[だいす]き！」\n\n2. 友達[ともだち]：「今[いま]、りんごをひとつ分[わ]けてくれる？」\n   あなた：「もちろん、どうぞ！」\n\n3. 秋[あき]になると、お店[みせ]に新[あたら]しいりんごがたくさん並[なら]びます。\n\n## 似[に]ている言葉[ことば]\n\n**梨[なし]**：りんごと同[おな]じく果物[くだもの]ですが、梨[なし]はもう少[すこ]し水分[すいぶん]が多[おお]くて、味[あじ]がさっぱりしています。りんごは甘[あま]みと酸味[さんみ]がありますが、梨[なし]はシャリシャリしていてあまり酸味[さんみ]がありません。",
    };

    return mockResponse;
  },
};
