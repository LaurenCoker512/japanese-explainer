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
        "もちろん！「りんご」について、10歳の子どもにわかるように説明しますね。\n\n---\n\n### 「りんご」の意味\n\nりんごは果物（くだもの）の一つです。赤や緑の色をしていて、丸い形をしています。甘くて、さっぱりした味がします。秋になるとよくとれます。\n\n---\n\n### 「りんご」を使った例文（れいぶん）\n\n1. **私は毎日（まいにち）りんごを食べます。**  \n（毎日、りんごを食べるよ。）\n2. **りんごの木にはたくさん実（み）がなっています。**  \n（りんごの木にりんごがいっぱいあるよ。）\n3. **お母さんがりんごを切（き）ってくれました。**  \n（お母さんがりんごを小さくしてくれたよ。）\n4. **給食（きゅうしょく）でりんごが出（で）ました。**  \n（学校のごはんでりんごが出たよ。）\n\n---\n\n### 「りんご」に一番近い言葉\n\n「りんご」に一番近い言葉は、**果物（くだもの）**です。「りんご」はたくさんある果物の中の一つです。\n\n---\n\n#### まとめ\n\n- りんごは赤や緑の果物（くだもの）\n- 丸くて、おいしい\n- 使い方はいろいろな文章で使える\n- 一番近い言葉は「果物」\n\nほかにも、**みかん**や**ぶどう**も、りんごと同じ「果物」だよ！\n\n---\n\nもしわからないところがあったら、また質問してね！",
    };

    return mockResponse;
  },
};
