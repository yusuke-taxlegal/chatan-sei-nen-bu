<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  member: {
    type: Object,
    required: true,
  },
  showGuide: {
    type: Boolean,
    default: true,
  },
})

// Toast notification state
const showToast = ref(false)
const toastMessage = ref('')

// Helper: Handle empty or missing values
const formatValue = (value) => {
  if (value === undefined || value === null || value === '') {
    return '（未入力）'
  }

  // Trim and handle consecutive newlines (max 2)
  if (typeof value === 'string') {
    return value.trim().replace(/\n{3,}/g, '\n\n')
  }

  return value
}

// A-1: Marketing Source Text
const marketingSourceText = `# 青年部×小規模事業者向け：『ハイパワー・マーケティング』エッセンス（要約動画ベース）
（NotebookLMソース用／実行できる形に噛み砕き版）

> 目的：青年部員（小規模事業者）が **「別格（卓越）」** を“考え方”で終わらせず、**少ない予算・少ない人数でも回る施策**として実行できる形に落とす。
> 想定：サービス業／建設業／飲食業／不動産業など、地域密着・少人数運営。

---

## 0. まず結論（この資料の使い方）
この資料は「マーケの教科書」ではなく、**今日から使う運用手順書**として書いています。

- **目的は“セールス不要”の状態に近づけること**
  （営業で押すのではなく「欲しい人が買いに来る」状態へ）
- そのために、まず **別格（卓越／Preeminent）** を目指す
  ＝「比較するまでもなく“あそこだよね”と言われる状態」
- 最短ルートは **テスト（実験）→勝ち筋だけ残す**
  ＝準備に時間をかけすぎない（Ready-Fire-Aim）

---

## 1. ゴール定義：究極のマーケティング＝「セールス不要」
### 1-1. “良いマーケ”ができている状態
- こちらが必死に売り込まなくても、**向こうから問い合わせが来る**
- 価格の説明より先に、相手が「お願いしたい」と言う
- 競合比較よりも「あなたに頼みたい」が先に立つ

### 1-2. 小規模事業者に置き換えると
- Google検索／紹介／SNSで「指名で」相談が来る
- 断る案件が出る（＝選べる）
- 値引き要求が減る（＝価値で選ばれる）

---

## 2. 別格（卓越／Preeminent）とは何か
### 2-1. “卓越”の感覚（中小向けに言い換え）
- 「平均よりちょい上」ではなく、**明らかに突き抜けている**
- **質も量も**、同業の中で“柱”のように目立つ
- 説明しなくても「あの人（あの店）は違うよね」と言われる

### 2-2. 別格を作るための“3つの着眼点”
1. **顧客のニーズ優先**（自分都合で売らない）
2. **強み（USP）を言語化**（買う理由を1つに絞る）
3. **不安を消す仕組み**（リスクリバーサル）

---

## 3. 卓越の戦略：顧客のニーズを最優先する
### 3-1. “良い人”の話ではなく「設計」の話
- その場の親切ではなく、**相手が成果を得るまでの導線**を作る
- 提案も「売りたいもの」ではなく「相手に必要なもの」から出す

### 3-2. 小規模事業者の実装例
- 飲食：売りたいメニューより「来店の目的（体験）」から設計
- 建設：工事内容より「不安（見積・工期・近隣）」の解消が先
- 不動産：物件情報より「失敗したくない不安（初期費用・審査・退去）」を先に潰す
- サービス：メニュー説明より「何が変わるか（変化）」を先に提示

---

## 4. 最短ルート：テストマーケティング（実験屋が強い）
### 4-1. 原則：考えるな、テストしろ
- 正解は“頭”ではなく“市場（顧客の反応）”が決める
- 小さく試して、反応の良いものにだけ資源を寄せる

### 4-2. Ready-Fire-Aim（準備→狙う→撃つ ではなく）
- **撃って（実行して）から、狙い（改善）を合わせる**
- 「完璧に準備してから」は遅い。小規模ほど機動力が武器。

### 4-3. すぐできる“超小型テスト”の型（MVP）
**MVP = 最低限の形で市場に出し、反応を測る**

- 予算：0〜3,000円〜1万円程度（できる範囲で）
- 期間：3日〜14日
- ゴール：次のどれかを確認
  - A：問い合わせが来るか
  - B：予約が入るか
  - C：見積依頼が来るか
  - D：紹介が生まれるか

**MVPテストのテンプレ（コピペ用）**
- テストする商品/サービス：
- 誰に（地域・属性・困りごと）：
- 何を約束する（ベネフィット）：
- 入口（SNS/チラシ/紹介/Google）：
- 期間：
- 予算：
- 反応指標（問い合わせ数/予約数/来店数/成約数）：
- 次アクション（勝ちなら拡大／負けなら変更点）：

---

## 5. A/B（スプリット）テスト：勝ち筋だけ残す
### 5-1. 変えるのは「1つだけ」
- タイトルだけ
- キャッチコピーだけ
- オファーだけ（特典／価格／期間）
- CTA（予約ボタン文言）だけ

### 5-2. “最初のA/B”におすすめの対象
- 飲食：来店理由を作る一言（例：◯◯フェア／限定セット）
- 建設：見積の不安を消す一言（例：現地調査無料／追加費用ゼロ宣言）
- 不動産：初期費用と入居不安の一言（例：初期費用の目安提示／審査サポート）
- サービス：成果の一言（例：◯日で△△が整う）

---

## 6. USP：独自の強み（＝買う理由）
### 6-1. USPの誤解（ありがち）
- 「うちは◯◯ができます」＝それは“業種の説明”であってUSPではない
  例：整体院が「整体できます」、不動産が「物件紹介できます」等

### 6-2. USPの定義（実務版）
- **競合が“やりたくてもできない”強み**を
- **顧客にとってのベネフィット**として
- **短い一言で**言える状態

### 6-3. USPの作り方（比較表→差分抽出）
1. 同業の主要3社を選ぶ
2. 比較軸を10個書く（価格／スピード／保証／専門性／実績／エリア等）
3. 自社が勝てる軸を1〜2個に絞る
4. それを“顧客言葉”に変換する

**USP作成テンプレ**
- 顧客が一番困っていること：
- 競合ができない理由：
- 自社ができる理由（資源・仕組み）：
- 一言USP（25文字以内）：
- 証拠（実績・数字・事例・レビュー）：

---

## 7. リスクリバーサル：購入の不安をこちらが引き受ける
### 7-1. “返金保証”だけが答えではない
顧客の不安は「お金」だけでなく
- 失敗したくない
- 時間を無駄にしたくない
- 恥をかきたくない
- 家族に反対されたくない
- 期待外れが怖い
など複合です。

### 7-2. 小規模事業者が実装しやすいリスクリバーサル例
- 飲食：待ち時間の見える化／提供遅延時の一品サービス
- 建設：追加費用が出る条件を事前明示／工期遅延時の対応
- 不動産：初期費用の“上限目安”提示／入居までの段取り表
- サービス：初回お試し／短時間の事前診断／成果が出ない場合の再提案

### 7-3. “Better Than Risk-Free”の発想（さらに一段手厚い）
- 「ダメなら返金」ではなく、**“相手の損”まで埋める設計**
  例：再対応・代替案・特典・無料延長など（無理のない範囲で）

---

## 8. アドオン（追加提案）：利益を増やす一番ラクな道
### 8-1. なぜアドオンが効くのか
- 新規獲得より、既存客への追加提案の方がコストが低い
- 顧客も「ついでに頼める」と楽

### 8-2. 小規模事業者のアドオン例
- 飲食：次回予約／テイクアウト／宴会プラン／ギフト
- 建設：定期点検／小修繕パック／補助金・融資の段取り支援（可能なら）
- 不動産：入居後サポート／火災保険・引越し手配／法人契約の整備
- サービス：継続プラン／メンテナンス／紹介特典

---

## 9. 30日で“回る”実行プラン（青年部向け・汎用）
### Week1：USPを決める（比較表→一言化）
- 比較軸10個で差分を抽出
- USPを25文字に固定
- 証拠（実績・事例）を1つ添える

### Week2：リスクリバーサルを設計（不安を潰す）
- 顧客の不安を10個書く
- そのうち上位3つに対して「仕組み」を作る
- 提案文に落とす（FAQ化）

### Week3：MVPテスト（3〜14日）
- 入口1つ、オファー1つ、測定指標1つ
- A/Bは1要素だけ
- 反応が良い方だけ残す

### Week4：アドオンを追加して利益を伸ばす
- 「ついでに頼める」追加商品を1つ作る
- 既存客にだけ案内→反応を見る
- 良ければ定番化

---

## 12. まとめ（ここだけ押さえればOK）
- 目標：**セールス不要**に近づける
- 状態：**別格（卓越）**＝比較不要の指名
- ルート：**テスト→勝ち筋に寄せる**
- 核：**USP（買う理由）**＋**リスクリバーサル（不安を消す）**
- 伸ばす：**アドオン（追加提案）**
- 30日で回す：週ごとに「決める→潰す→試す→伸ばす」`

// A-2: Profile Source Data Text
const profileSourceText = computed(() => {
  if (!props.member) return ''

  const m = props.member

  // Get current date for updated_at (fallback to today if no server timestamp available easily)
  const today = new Date()
  const updatedDate = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`

  return `# 部員プロフィール（AI用ソース）
更新日：${updatedDate}

【氏名】${formatValue(m.name)}（${formatValue(m.phoneticName)}）
【会社名】${formatValue(m.company)}

【自己紹介・事業内容】
${formatValue(m.bio)}

【対応できるニーズ（できること）】
${formatValue(m.needs)}

【過去に青年部内で取引した事例】
${formatValue(m.pastTransactions)}

【提供できる情報（得意領域・共有できる知見）】
${formatValue(m.providableInfo)}

【求めている情報（紹介してほしいこと・探していること）】
${formatValue(m.seekingInfo)}

【Web/SNS/YouTube】
- Web：${formatValue(m.website)}
- SNS：${formatValue(m.sns)}
- YouTube：${formatValue(m.youtube)}

【補足（任意）】
- 対象エリア/客層：（未入力）
- 価格帯/最低ロット：（未入力）
- 連絡手段：（未入力）`
})

// B: Instruction Prompt (Updated for High Power Marketing)
const instructionPrompt = computed(() => {
  return `あなたは「青年部のビジネスマッチングを加速する編集者兼マーケ担当」です。
次の【AI用ソース】の情報“だけ”を根拠に、推測は「仮説」と明記して出力してください。

※複数事業がある場合は「事業A/B/C」に分け、最後に“共通の強み”をまとめてください。

# 出力してほしいもの（順番固定）
1) 事業を一言で（15〜25文字）
2) 30秒の自己紹介（口頭用）
3) 紹介文：100字／300字（青年部チャット用）
4) 強み・差別化：3つ（根拠となる記載も一緒に）
5) 「紹介してほしい相手」の定義：3パターン（困りごと起点で）
6) 青年部内コラボ案：3つ（相手業種例も付ける）
7) 30日でできる“軽いマーケ施策”プラン（週ごと／コスト小さめ）
8) 追加で聞くべき質問：5つ（優先度順）

# 出力ルール
- 断定しない。根拠が薄い場合は「仮説」と明記。
- 専門用語は噛み砕く。
- 文章は堅すぎない（青年部の場に合うトーン）。
- 箇条書きを多用し、読みやすく。

【AI用ソース】
- ハイパワーマーケティング エッセンス
- 部員プロフィール情報源
※両方を読んだ上で出力してください。`
})

// アイソメ・イエロー デザインシステム共通指示（両プロンプトで再利用）
const isometricYellowDesignSystem = `
※ここから下は「あなたへの指示」であり、スライドには一切表示しないこと。このプロンプトの文章・見出し・例文を、そのままスライドのテキストとして使ってはいけない。

あなたは、日本のニューエコノミー系ビジネスメディアを牽引するトップアートディレクター兼インフォグラフィックデザイナーです。以下の事業者情報に基づき、スマホ世代のビジネスパーソンの知的興奮を誘う、ビジュアル重視のハイセンスなプレゼンテーションスライドを生成してください。

【出力時の絶対ルール】
1. Markdown記号の禁止
- スライド内テキストに「#」「*」「**」などのMarkdown記号を含めないこと。
- 箇条書きが必要な場合も、「・」「-」で始めず、通常の文章として書くこと。

2. プレーンテキストのみ
- スライド上の文字は、日本語と英語のプレーンテキストのみとすること。

3. 1スライド1メッセージ
- 各スライドには「1つだけの主張／問い／結論」だけを載せること。
- 情報量が多くなりそうな場合は、迷わずスライドを分割すること。

4. ヘッダーまわり
- スライド上部の帯状・タブ状のラベル（ISSUE 01、VECTOR、TRAPなど）は配置してはいけない。
- UI的な英語タグを入れる場合は、四隅や端に小さなプレーンテキストだけ置く。枠線付きボックスや塗りつぶしのパネルは禁止。

5. 内部指示の漏れ防止（重要）
- 画像内や端の小さな文字に、X / Y / LAYER / API / PARAM / DEBUG 等の内部っぽい語を出さない。
- 端に置ける英語は、意味が自然な短語だけに限定する（例：INSIGHT / FOCUS / SIGNAL / NOISE / DECISION / PRIORITY / FRAME / WORKFLOW）。
- 画像生成に使う場合も、画像内へ文字は描き込まない（文字はスライドのテキスト要素として配置）。

【世界観・ビジュアルOS（オリジナル版）】
トーン
- ミニマル、無彩色、硬質で知的。だけど冷たすぎない。
- ニューエコノミー系の編集デザインとして、余白とコントラストで"信頼"を作る。
- 写真の情緒ではなく、比喩アイコン化された「理解の気持ちよさ」で気分を上げる。

比喩メタファー選択（内部で必ず実行）
- この事業者のビジネス内容から、最も直感的で自分ごと化しやすい比喩を1つだけ選ぶ。
- 候補：都市／交通（路線・乗り換え）／料理（レシピ・仕込み）／登山（ルート・装備）／工場（ライン・工程）／図書館（索引・棚）／ゲーム（クエスト・UI）
- 以後の図解・イラストは、その比喩に統一して展開する（世界観のブレ禁止）。

視点・質感・イラスト方針
- 図解・場面表現は原則ミニマルで、やや丸みのあるアイソメトリック（等角投影）。
- 線は黒〜濃グレーのクリーンな、太い主線のラインアート＋薄い影（主張しすぎない）。
- 面はベース背景は白、もしくは部分的にライトグレーで構成し、情報の"構造"が見える設計図感を出す。
- アイソメ図解には、必ず人間（視聴者の代理）を1〜3人入れる。見ている／迷っている／選んでいる等の行動が分かるポーズにする。
- 写真は原則使わない（コラージュ写真なし型）。使う場合も全面敷きは禁止。小さな切り抜き素材として、ごく控えめに1枚まで（ただし基本は使わない）。

グリッド
- 背景には薄いグリッドを敷き、編集デザインとしての"設計感"を出す（ごく薄く、邪魔しない）。

【カラーパレット（差し替え）】
- 背景：白(#FFFFFF) または クールグレー(#F5F5F5)
- ベース要素：ライトグレー〜ホワイト
- テキスト：スミ(#111111)
- アクセントは1色のみ
  - エレクトリックイエロー(#FFCC00)
- 他の有彩色（シアン、レッド等）は使わない。発光表現も黄色の明度差だけで作る。
- 色はすべて「意味（重要・焦点・選択・リスク）」のインジケーターとして使う。装飾として散らさない。

【タイポグラフィ（補強）】
見出し
- 極太ゴシック（ImpactやヒラギノW8級イメージ）の日本語。
- 各スライドで、最も大きい要素は必ず見出しテキストとする。
- 見出しの文字サイズは、本文の少なくとも15倍。行の高さはスライド縦の約3分の1以上を占めるイメージで大きく。
- 必要に応じて、見出しの近くに細い英語短語を小さく添えてよい（上記の限定語彙のみ）。

本文
- 可読性の高いゴシック体。
- 1ブロックあたり30〜40文字×最大2行を目安とし、3行を超えない。
- 文字サイズは、見出しの20％以下に抑え、強いジャンプ率をつける。

強調
- 重要な数字やキーワードは、エレクトリックイエローのマーカーラインでなぞったようなイメージで表現する。
- 1スライドあたり強調は1〜2箇所まで。

【コピーの"エッジ"指定（追加）】
- キーポイントの見出しは、日本語の強い言い切り＋短い英語（1〜4語）をセットで置いてよい。
- 英語は説明文ではなく"タグ/断言"として短く置く（例：Overload / One Move / Wrong Game / Signal First / Choose One / Stop Scrolling）。
- 日本語は自分ごと化の痛み、境界線、矛盾、罠の命名を優先する。
- 例の型（そのまま引用しないで新規生成する）
  - 情報だけ増えて、前に進めない。Overload
  - その努力、違うゲームだ。Wrong Game
  - 迷うほど、手が止まる。Decision Trap
  - "一手"だけ決める。One Move

【スライド構成：3タイプ】
各スライドは必ず次のいずれか1種類に分類して構成する。

1. TYPE A：インパクト（文字重視）
用途：最重要メッセージ／強い結論／問いかけ／転換点。
構成：
- 画像を使わず、背景＋巨大なテキストのみ。
- 背景は白またはクールグレー＋アクセントカラー少量。
- テキストは1〜2行に絞る。本文はなくてもよい。

2. TYPE B：ビジュアル（イラスト重視に変更）
用途：利用シーン／感情／ペイン／罠や危機の描写。
構成：
- 写真ではなく、比喩メタファーに沿ったアイソメ／ラインアートの場面イラストを使用する（人物を必ず入れる）。
- イラストはサムネサイズではなく、スライド幅いっぱいに大きく配置し、上下左右いずれかは画面端まで到達させる。必要ならはみ出すほどトリミングしてよい。
- 見出しはイラストの上または周囲に大きく配置し、本文は短い一文だけ小さく添える。
- 罠や危機のスライドでは、構図を重くし、黄色のアクセントは"危険箇所/詰まり/焦点"だけに置く。

3. TYPE C：ロジック（図解・イラスト重視）
用途：構造／比較／プロセス／仕組み。
構成：
- 長文説明ではなく、アイソメトリックな図解やミニマルな概念図で見せる。
- アクセントカラーはエレクトリックイエローのみ。
- 床面にグリッド、四隅に小さな英語短語を置き、編集デザインの"誌面感"を保つ（ただし内部っぽい語は禁止）。

TYPE Cの代表レイアウト例（必要に応じて使用）
- オーバービュー：比喩世界を俯瞰し、重要エリアだけ黄色でハイライト。
- 分解図：3層や3ステップに分けて、関係だけ見せる（要素を増やしすぎない）。
- ボトルネック図：詰まり箇所だけ黄色で示し、人間が困っている様子を入れる。
- フロー：流れを線で示し、迷う分岐を明確に描く。
- A/B比較：左右に並べて、違いは3点まで。

【表紙スライドの特別指定】
表紙はシリーズ中で最もインパクトが強いスライドとする。文字だけ表紙は禁止。TYPE B＋TYPE Cのハイブリッド構成にすること。

デザイン・レイアウト
- スイス・スタイル／バウハウスを意識したグリッドベース。
- 比喩メタファーに沿った"主役のアイソメモチーフ"を必ず1つ置く（人物も必ず入れる）。
- タイトルの中央揃えは禁止。四隅または上下いずれかの端に寄せた非対称レイアウトにする。
- スライド上部に帯状・タブ状ラベルは置かない。必要なら、端に小さな英語短語だけ添える（限定語彙）。

タイトルコピー
- メインコピー（極大）：
  - 抽象名詞1語だけのタイトルは禁止。
  - 読者のペインや境界線を1文で言い切るキャッチコピーとする。
  - スライド内で最大サイズの文字とし、本文の少なくとも15倍の大きさにする。
- サブコピー（極小）：
  - 読み進めると何が変わるかを1文で約束する。
  - 近くに短い英語（1〜4語）を添えて"誌面の抜け"を作ってよい（限定語彙、内部語禁止）。

【最後に】
- すべてのスライドは、上記の世界観とカラールール、タイポグラフィ、TYPE A/B/Cのいずれかの構成に従うこと。
- シリーズ全体として、ニューエコノミー系ビジネスメディアの特集記事をそのままスライド化したような、一貫したトーンを保つこと。`

// プロフィール情報を埋め込むヘルパー
const memberProfileBlock = computed(() => {
  if (!props.member) return ''
  const m = props.member
  return `
【事業者プロフィール情報】
氏名：${formatValue(m.name)}（${formatValue(m.phoneticName)}）
会社名：${formatValue(m.company)}
自己紹介・事業内容：${formatValue(m.bio)}
対応できるニーズ（できること）：${formatValue(m.needs)}
過去に青年部内で取引した事例：${formatValue(m.pastTransactions)}
提供できる情報（得意領域・共有できる知見）：${formatValue(m.providableInfo)}
求めている情報（紹介してほしいこと・探していること）：${formatValue(m.seekingInfo)}
Web：${formatValue(m.website)}
SNS：${formatValue(m.sns)}
YouTube：${formatValue(m.youtube)}`
})

// C-1a: Slide Prompt – 自分用（今後の戦略・学び）
const slideStrategyPrompt = computed(() => {
  return `追加した2つのソース（ハイパワーマーケティングとプロフィール）をもとに、この事業者が「今後どのように動けば良いのか」を学べるスライド資料を作成してください。

以下の構成に沿ってください：
1) 現状分析：この事業者の強みと課題（プロフィールから読み取れるものだけ）
2) USP（独自の強み）の言語化…競合との差分を踏まえた25文字の一言化案
3) リスクリバーサル…この事業者の顧客が持つ不安を3つ特定し、それぞれの消し方を具体的に提示
4) MVPテスト案…予算0〜1万円・14日以内で試せる小さな実験を3つ提案
5) アドオン（追加提案）…既存客向けに「ついでに」売れる商品・サービスを具体的に提案
6) 30日実行プラン…Week1〜Week4のスケジュール入りで「明日何をするか」が明確な形

※スライドごとに「見出し」「ポイント」「事業者への問いかけ（→ あなたの場合は？）」を入れて、自分事として考えられる構成にしてください。
※専門用語は噂み砕き、青年部の場に合った親しみやすいトーンで。`
})

// C-1b: Slide Prompt – 提案用（お客様向け）
const slideProposalPrompt = computed(() => {
  return `追加した2つのソース（ハイパワーマーケティングとプロフィール）をもとに、この事業者が「見込み客・新規客への提案・自己紹介」に使えるプレゼン用スライド構成を作成してください。

以下の構成に沿ってください：
1) 課題の共感…「こんなお悩みありませんか？」（顧客の不安・困りごとから始める）
2) 解決策の提示…この事業者が提供できる価値（USP）を明確に
3) 実績・証拠…信頼性を裏付ける事例や数字
4) 安心設計…リスクリバーサル（「失敗したらどうなる？」への答え）
5) 次のアクション…予約・問い合わせ・相談などCTA

※スライドごとに、話のスクリプトも添えてください。
※「売り込み」感を消し、「この人に頼みたい」と思わせるトーンで。`
})

// C-1c: アイソメ・イエロー版 – 自分用
const isometricStrategyPrompt = computed(() => {
  return `以下の事業者が「今後どのように動けば良いのか」を学べるスライド資料を作成してください。
${memberProfileBlock.value}

【スライドで扱うテーマ】
1) 現状分析：この事業者の強みと課題
2) USP（独自の強み）の言語化…競合との差分を踏まえた25文字の一言化案
3) リスクリバーサル…この事業者の顧客が持つ不安を3つ特定し、それぞれの消し方を具体的に提示
4) MVPテスト案…予算0〜1万円・14日以内で試せる小さな実験を3つ提案
5) アドオン（追加提案）…既存客向けに「ついでに」売れる商品・サービスを具体的に提案
6) 30日実行プラン…Week1〜Week4のスケジュール入りで「明日何をするか」が明確な形

※スライドごとに「見出し」「ポイント」「事業者への問いかけ（→ あなたの場合は？）」を入れて、自分事として考えられる構成にしてください。
${isometricYellowDesignSystem}
- 特にTYPE Cでは、比喩メタファーを使い、この事業者の位置づけと価値が直感的に伝わる図解になっているかを最優先で判断すること。`
})

// C-1d: アイソメ・イエロー版 – 提案用
const isometricProposalPrompt = computed(() => {
  return `以下の事業者が「見込み客・新規客への提案・自己紹介」に使えるプレゼン用スライドを作成してください。
${memberProfileBlock.value}

【スライドで扱うテーマ】
1) 課題の共感…「こんなお悩みありませんか？」（顧客の不安・困りごとから始める）
2) 解決策の提示…この事業者が提供できる価値（USP）を明確に
3) 実績・証拠…信頼性を裏付ける事例や数字
4) 安心設計…リスクリバーサル（「失敗したらどうなる？」への答え）
5) 次のアクション…予約・問い合わせ・相談などCTA

※スライドごとに、話のスクリプトも添えてください。
※「売り込み」感を消し、「この人に頼みたい」と思わせるトーンで。
${isometricYellowDesignSystem}
- 特にTYPE Cでは、比喩メタファーを使い、この事業者の位置づけと価値が直感的に伝わる図解になっているかを最優先で判断すること。`
})

// C-2: Audio Prompt
const audioPrompt = computed(() => {
  return `2人のマーケティングコンサルタントが、追加されたプロフィール情報をもとに『この事業者がどうすれば地域で突出した存在（別格）になれるか』を熱く議論するラジオ番組を作ってください。ハイパワーマーケティングの視点（USPとリスクリバーサル）を必ず交えてください。`
})

// C-3: Infographic Prompt
const infographicPrompt = computed(() => {
  return `この事業者の『現状の課題』『独自の強み（USP）』『具体的なマーケティング施策（テスト・アドオンなど）』の3ステップを1枚の画像で直感的に伝えるインフォグラフィックを作成してください。専門用語は使わず、箇条書きで分かりやすく整理してください。`
})

// D: 万能プロンプト（そのまま使える1本）
const universalPrompt = `以下のソースだけを根拠に、推測は"仮説"と明記して出力して。

1. 事業の一言定義（25文字）
2. 30秒自己紹介
3. 100字/300字紹介文
4. 強み3つ（根拠の記載も）
5. 紹介してほしい相手3パターン
6. 30日でできる施策（週ごと）
7. KPI3つ
8. 追加質問5つ（優先度順）`

const copyToClipboard = async (text, type) => {
  try {
    await navigator.clipboard.writeText(text)
    triggerToast(`${type}をコピーしました！`)
  } catch (err) {
    console.error('Failed to copy text: ', err)
    triggerToast('コピーに失敗しました。テキストを選択して手動でコピーしてください。')
  }
}

const triggerToast = (msg) => {
  toastMessage.value = msg
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}
</script>

<template>
  <div class="notebooklm-generator">
    <details class="generator-collapse">
      <summary class="generator-header">
        <div class="header-icon">🤖</div>
        <div class="header-texts">
          <h3 class="font-subheading">NotebookLM用 プロンプト生成 (1時間セミナー向け)</h3>
          <p class="font-body subtitle">タップして手順とプロンプトを表示</p>
        </div>
        <span class="expand-indicator">▶</span>
      </summary>

      <div class="collapse-body-link">
        <a href="https://notebooklm.google.com/" target="_blank" class="nblm-link"
          >👉 NotebookLMを開く</a
        >
      </div>

      <!-- Stepper Guidance -->
      <div class="guidance-steps">
        <div class="step">
          <div class="step-num">手順1</div>
          <div class="step-desc">
            下の<strong>【A-1】マーケティングソース</strong>をコピーし、NotebookLMの「ソースを追加」→「テキスト」に貼り付けます。
          </div>
        </div>
        <div class="step">
          <div class="step-num">手順2</div>
          <div class="step-desc">
            続けて<strong>【A-2】プロフィールソース</strong>をコピーし、同様にNotebookLMの「ソースを追加」→「テキスト」に貼り付けます。
          </div>
        </div>
        <div class="step">
          <div class="step-num">手順3</div>
          <div class="step-desc">
            最後に<strong>【B】依頼用プロンプト</strong>をコピーし、NotebookLM下部のチャット入力欄に貼り付けて送信します。
          </div>
        </div>
      </div>

      <div class="actions-grid">
        <!-- A-1: Marketing Source Box -->
        <div class="action-card">
          <div class="card-header">
            <span class="badge source-badge">ソース用</span>
            <h4>【A-1】マーケティングソース</h4>
          </div>
          <p class="desc">ハイパワーマーケティングのノウハウ読本です。</p>
          <button
            @click="copyToClipboard(marketingSourceText, '【A-1】マーケティングソース')"
            class="btn copy-btn primary-copy"
          >
            <span class="btn-icon">📋</span> 【A-1】ソースをコピー
          </button>
          <details class="preview-details">
            <summary>プレビューを見る</summary>
            <pre class="preview-text">{{ marketingSourceText }}</pre>
          </details>
        </div>

        <!-- A-2: Profile Source Box -->
        <div class="action-card">
          <div class="card-header">
            <span class="badge source-badge">ソース用</span>
            <h4>【A-2】プロフィールソース</h4>
          </div>
          <p class="desc">AIに読ませるための基本データです。</p>
          <button
            @click="copyToClipboard(profileSourceText, '【A-2】プロフィールソース')"
            class="btn copy-btn primary-copy"
          >
            <span class="btn-icon">📋</span> 【A-2】ソースをコピー
          </button>
          <details class="preview-details">
            <summary>プレビューを見る</summary>
            <pre class="preview-text">{{ profileSourceText }}</pre>
          </details>
        </div>

        <!-- B: Prompt Box -->
        <div class="action-card full-width">
          <div class="card-header">
            <span class="badge prompt-badge">依頼用</span>
            <h4>【B】出力司令プロンプト</h4>
          </div>
          <p class="desc">AIに紹介文やコラボ案を考えさせる指示書です。</p>
          <button
            @click="copyToClipboard(instructionPrompt, '【B】依頼用プロンプト')"
            class="btn copy-btn secondary-copy"
          >
            <span class="btn-icon">✨</span> 【B】プロンプトをコピー
          </button>
          <details class="preview-details">
            <summary>プレビューを見る</summary>
            <pre class="preview-text">{{ instructionPrompt }}</pre>
          </details>
        </div>
      </div>

      <!-- Advanced Studio Guide -->
      <div class="advanced-section">
        <div class="advanced-header">
          <span class="advanced-icon">🚀</span>
          <h4>応用編：慣れてきた方へ（さらに活用する）</h4>
        </div>
        <p class="advanced-desc">
          情報（2つのソース）がNotebookLMに入っている状態なら、<strong>「スタジオ機能」</strong>を使うだけで、自動で高品質な資料が出来上がります。
        </p>
        <div class="studio-features">
          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h5>スライド資料</h5>

            <p class="feature-sub">① 自分用：今後の戦略・学び</p>
            <p>
              ハイパワーマーケティングの施策を自社向けに整理。「今後どう動くか」が明確になります。
            </p>
            <button
              @click="copyToClipboard(slideStrategyPrompt, 'スライド用（自分用戦略）')"
              class="btn copy-btn studio-btn"
            >
              <span class="btn-icon">📋</span>自分用プロンプトをコピー
            </button>
            <details class="preview-details">
              <summary>プレビューを見る</summary>
              <pre class="preview-text">{{ slideStrategyPrompt }}</pre>
            </details>

            <p class="feature-sub">② 提案用：お客様への紹介資料</p>
            <p>見込み客や新規客に「この人に頼みたい」と思わせる提案スライドを作成します。</p>
            <button
              @click="copyToClipboard(slideProposalPrompt, 'スライド用（提案用）')"
              class="btn copy-btn studio-btn"
            >
              <span class="btn-icon">📋</span>提案用プロンプトをコピー
            </button>
            <details class="preview-details">
              <summary>プレビューを見る</summary>
              <pre class="preview-text">{{ slideProposalPrompt }}</pre>
            </details>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎧</div>
            <h5>音声解説</h5>
            <p>ラジオ番組のような対話形式で、強みやマーケティング案を音声化します。</p>
            <button
              @click="copyToClipboard(audioPrompt, '音声解説用プロンプト')"
              class="btn copy-btn studio-btn"
            >
              <span class="btn-icon">📋</span>専用プロンプトをコピー
            </button>
            <details class="preview-details">
              <summary>プレビューを見る</summary>
              <pre class="preview-text">{{ audioPrompt }}</pre>
            </details>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🗺️</div>
            <h5>インフォグラフィック</h5>
            <p>情報を図解や1枚のまとめ画像に適した形に整理してくれます。</p>
            <button
              @click="copyToClipboard(infographicPrompt, 'インフォグラフィック用プロンプト')"
              class="btn copy-btn studio-btn"
            >
              <span class="btn-icon">📋</span>専用プロンプトをコピー
            </button>
            <details class="preview-details">
              <summary>プレビューを見る</summary>
              <pre class="preview-text">{{ infographicPrompt }}</pre>
            </details>
          </div>
        </div>
      </div>

      <!-- Deep Dive Guide Section -->
      <div v-if="showGuide" class="deep-dive-section">
        <div class="deep-dive-header">
          <span class="deep-dive-icon">📚</span>
          <div>
            <h4>さらなる応用編：NotebookLM 実践ガイド</h4>
            <p class="deep-dive-subtitle">
              セミナー後にそのまま使える、売上・利益・時間に直結するNotebookLM活用法
            </p>
          </div>
        </div>

        <!-- 1) 勝ち筋3パターン -->
        <details class="guide-accordion">
          <summary class="accordion-trigger">
            <span class="accordion-num">1</span>
            <span class="accordion-title">まずこれだけ：NotebookLMの"勝ち筋"3パターン</span>
          </summary>
          <div class="accordion-content">
            <div class="pattern-grid">
              <div class="pattern-card">
                <div class="pattern-label">A. 整理</div>
                <h5>「散らかった情報」を一瞬で使える形にする</h5>
                <p class="pattern-example">
                  例：議事録／メモ／LINE相談／お客様の声／見積のやり取り
                </p>
                <p class="pattern-result">→ FAQ、提案文、手順書、次の一手に変換</p>
              </div>
              <div class="pattern-card">
                <div class="pattern-label">B. 専属化</div>
                <h5>「あなたの商売専用AI」を作る</h5>
                <p class="pattern-example">
                  例：自社のメニュー、強み、事例、価格帯、顧客層を入れる
                </p>
                <p class="pattern-result">→ 指名される紹介文・投稿文・説明資料がブレずに出る</p>
              </div>
              <div class="pattern-card">
                <div class="pattern-label">C. 改善</div>
                <h5>「小さく試して勝ち筋だけ残す」</h5>
                <p class="pattern-example">例：投稿、キャンペーン、チラシ、紹介施策</p>
                <p class="pattern-result">→ A/B案、チェックリスト、改善点を短時間で回す</p>
              </div>
            </div>
          </div>
        </details>

        <!-- 2) 3つのノートブック -->
        <details class="guide-accordion">
          <summary class="accordion-trigger">
            <span class="accordion-num">2</span>
            <span class="accordion-title">いちばん効果が出る「3つのノートブック」運用</span>
          </summary>
          <div class="accordion-content">
            <div class="notebook-block">
              <div class="notebook-header">
                <span class="notebook-emoji">🏢</span>
                <div>
                  <h5>① 自社ノート（固定資産）</h5>
                  <p class="notebook-subtitle">
                    "紹介される素材"が完成 → 交流会・紹介・SNSが一気に楽
                  </p>
                </div>
              </div>
              <div class="notebook-grid">
                <div class="notebook-col">
                  <h6>📥 入れるソース</h6>
                  <ul>
                    <li>事業概要（1枚）</li>
                    <li>メニュー/サービス一覧、価格帯</li>
                    <li>事例（3つ）・お客様の声</li>
                    <li>よくある質問（今は空でOK）</li>
                    <li>NG（やらないこと）</li>
                  </ul>
                </div>
                <div class="notebook-col">
                  <h6>💬 これだけ聞けばOK</h6>
                  <ul>
                    <li>「うちの強みを25文字で」</li>
                    <li>「100字/300字/30秒の紹介文」</li>
                    <li>「紹介してほしい人を3パターン」</li>
                    <li>「よくある質問10個＋回答テンプレ」</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="notebook-block">
              <div class="notebook-header">
                <span class="notebook-emoji">📣</span>
                <div>
                  <h5>② 集客ノート（30日改善）</h5>
                  <p class="notebook-subtitle">30日分の投稿/施策が"作業"ではなく"改善"として回る</p>
                </div>
              </div>
              <div class="notebook-grid">
                <div class="notebook-col">
                  <h6>📥 入れるソース</h6>
                  <ul>
                    <li>Instagram/Googleビジネス/チラシ文</li>
                    <li>反応が良かった/悪かった投稿（10件）</li>
                    <li>予約状況・問い合わせ内容</li>
                  </ul>
                </div>
                <div class="notebook-col">
                  <h6>💬 聞く質問</h6>
                  <ul>
                    <li>「反応が良い投稿の共通点を3つ」</li>
                    <li>「来週の投稿案を5本（認知/信頼/行動）」</li>
                    <li>「A/Bで試すなら何を1つ変えるべき？」</li>
                    <li>「0〜3000円でできるテスト施策を3つ」</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="notebook-block">
              <div class="notebook-header">
                <span class="notebook-emoji">⚙️</span>
                <div>
                  <h5>③ オペレーションノート（時間を増やす）</h5>
                  <p class="notebook-subtitle">返信・教育・引き継ぎが標準化 → 少人数でも回る</p>
                </div>
              </div>
              <div class="notebook-grid">
                <div class="notebook-col">
                  <h6>📥 入れるソース</h6>
                  <ul>
                    <li>予約対応のやり取り（LINE/メール）</li>
                    <li>受付～提供～会計の手順</li>
                    <li>クレームやヒヤリの記録</li>
                    <li>スタッフへの指示メモ</li>
                  </ul>
                </div>
                <div class="notebook-col">
                  <h6>💬 聞く質問</h6>
                  <ul>
                    <li>「ミスが起きやすいポイントTOP5と対策」</li>
                    <li>「新人向け手順書（チェックリスト形式）」</li>
                    <li>「問い合わせ返信テンプレを5パターン」</li>
                    <li>「クレーム対応の"角が立たない文面"」</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </details>

        <!-- 3) 業種別 -->
        <details class="guide-accordion">
          <summary class="accordion-trigger">
            <span class="accordion-num">3</span>
            <span class="accordion-title">業種別の"刺さる"使い方（即効性高い順）</span>
          </summary>
          <div class="accordion-content">
            <div class="industry-grid">
              <div class="industry-card">
                <div class="industry-icon">🍽️</div>
                <h5>飲食業</h5>
                <ul>
                  <li>メニュー説明 → 「迷わず注文される」言い回しに統一</li>
                  <li>口コミから「強みの言語化」→ POP/投稿に転用</li>
                  <li>予約問い合わせ返信テンプレ → 時間削減</li>
                </ul>
                <div class="industry-prompts">
                  <p class="prompts-label">💬 聞く質問例</p>
                  <p>「人気メニューの魅力を一言で。POP文も3案」</p>
                  <p>「常連化のための導線（次回来店の一言）」</p>
                </div>
              </div>
              <div class="industry-card">
                <div class="industry-icon">🏗️</div>
                <h5>建設業（工務店/設備/リフォーム）</h5>
                <ul>
                  <li>見積・工期・追加費用の不安を"先回り"FAQ化</li>
                  <li>施工事例を「成果ストーリー」に変換 → 紹介されやすく</li>
                </ul>
                <div class="industry-prompts">
                  <p class="prompts-label">💬 聞く質問例</p>
                  <p>「見積で揉める原因と、事前説明テンプレ」</p>
                  <p>「事例をお客様目線でビフォーアフター文章化」</p>
                </div>
              </div>
              <div class="industry-card">
                <div class="industry-icon">🏠</div>
                <h5>不動産業（賃貸/売買/管理）</h5>
                <ul>
                  <li>初期費用・審査・退去の不安を"説明資料1枚"に</li>
                  <li>物件紹介の文章を「刺さる条件整理」に変換</li>
                </ul>
                <div class="industry-prompts">
                  <p class="prompts-label">💬 聞く質問例</p>
                  <p>「入居希望者が不安に感じることTOP10と回答」</p>
                  <p>「内見予約につながる紹介文100字/300字」</p>
                </div>
              </div>
              <div class="industry-card">
                <div class="industry-icon">💼</div>
                <h5>サービス業（美容/整体/士業/コンサル等）</h5>
                <ul>
                  <li>初回の説明（価値・流れ・料金）を統一</li>
                  <li>"お客様の声（仮）"を設計 → 実際の収集質問に落とす</li>
                </ul>
                <div class="industry-prompts">
                  <p class="prompts-label">💬 聞く質問例</p>
                  <p>「初回の説明台本（60秒）」</p>
                  <p>「口コミを集める質問テンプレ10個」</p>
                </div>
              </div>
            </div>
          </div>
        </details>

        <!-- 4) 30日ロードマップ -->
        <details class="guide-accordion">
          <summary class="accordion-trigger">
            <span class="accordion-num">4</span>
            <span class="accordion-title">「繁栄」に繋げる最短ロードマップ（30日）</span>
          </summary>
          <div class="accordion-content">
            <div class="roadmap">
              <div class="roadmap-step">
                <div class="roadmap-marker day1">Day 1</div>
                <div class="roadmap-body">
                  <h5>自社ノート作成（30分）</h5>
                  <p>事業概要1枚＋紹介文を入力</p>
                </div>
              </div>
              <div class="roadmap-connector"></div>
              <div class="roadmap-step">
                <div class="roadmap-marker week1">Week 1</div>
                <div class="roadmap-body">
                  <h5>FAQ10個＋返信テンプレ作成</h5>
                  <p>対応時間が減り、"時間が増える"を実感</p>
                </div>
              </div>
              <div class="roadmap-connector"></div>
              <div class="roadmap-step">
                <div class="roadmap-marker week2">Week 2</div>
                <div class="roadmap-body">
                  <h5>投稿/施策の週次計画（5本）</h5>
                  <p>集客ノートを使い、目的別に計画</p>
                </div>
              </div>
              <div class="roadmap-connector"></div>
              <div class="roadmap-step">
                <div class="roadmap-marker week3">Week 3</div>
                <div class="roadmap-body">
                  <h5>0〜3000円のテスト施策を1つ実行</h5>
                  <p>小さく試して反応を測定</p>
                </div>
              </div>
              <div class="roadmap-connector"></div>
              <div class="roadmap-step">
                <div class="roadmap-marker week4">Week 4</div>
                <div class="roadmap-body">
                  <h5>反応を分析 → 勝ち筋だけ残す</h5>
                  <p>改善ループ開始。繁栄の土台が完成</p>
                </div>
              </div>
            </div>
          </div>
        </details>

        <!-- 5) 万能プロンプト -->
        <details class="guide-accordion">
          <summary class="accordion-trigger">
            <span class="accordion-num">5</span>
            <span class="accordion-title">"そのまま使える"万能プロンプト</span>
          </summary>
          <div class="accordion-content">
            <p class="universal-desc">
              NotebookLMのチャット欄にそのまま貼って使えます。ソースを入れた後にこのプロンプトを送信するだけでOK。
            </p>
            <div class="universal-prompt-box">
              <pre class="universal-prompt-text">{{ universalPrompt }}</pre>
            </div>
            <button
              @click="copyToClipboard(universalPrompt, '万能プロンプト')"
              class="btn copy-btn universal-copy-btn"
            >
              <span class="btn-icon">📋</span>万能プロンプトをコピー
            </button>
          </div>
        </details>

        <!-- まとめ -->
        <!-- 6) アイソメ・イエロー デザインシステム -->
        <details class="guide-accordion">
          <summary class="accordion-trigger">
            <span class="accordion-num">6</span>
            <span class="accordion-title"
              >🎨 ハイセンスなスライド：アイソメ・イエロー デザインシステム</span
            >
          </summary>
          <div class="accordion-content">
            <p class="universal-desc">
              アイソメトリック（等角投影）イラスト ×
              エレクトリックイエローのアクセントカラーで、ニューエコノミー系ビジネスメディアのような<strong>プロ品質のスライド</strong>を自動生成するデザインシステムです。プロフィール情報が自動で埋め込まれます。
            </p>

            <div class="notebook-block">
              <h5>① 自分用：戦略・学びスライド（アイソメ・イエロー）</h5>
              <p class="notebook-subtitle">
                USP・リスクリバーサル・30日プランを、視覚重視のハイセンスなデザインで整理
              </p>
              <button
                @click="copyToClipboard(isometricStrategyPrompt, 'アイソメ・イエロー（自分用）')"
                class="btn copy-btn universal-copy-btn"
                style="margin-top: 0.75rem"
              >
                <span class="btn-icon">📋</span>自分用プロンプトをコピー
              </button>
              <details class="preview-details">
                <summary>プレビューを見る</summary>
                <pre class="preview-text">{{ isometricStrategyPrompt }}</pre>
              </details>
            </div>

            <div class="notebook-block">
              <h5>② 提案用：お客様向けスライド（アイソメ・イエロー）</h5>
              <p class="notebook-subtitle">
                「この人に頼みたい」と思わせるハイセンスな企画提案資料
              </p>
              <button
                @click="copyToClipboard(isometricProposalPrompt, 'アイソメ・イエロー（提案用）')"
                class="btn copy-btn universal-copy-btn"
                style="margin-top: 0.75rem"
              >
                <span class="btn-icon">📋</span>提案用プロンプトをコピー
              </button>
              <details class="preview-details">
                <summary>プレビューを見る</summary>
                <pre class="preview-text">{{ isometricProposalPrompt }}</pre>
              </details>
            </div>
          </div>
        </details>

        <div class="guide-summary">
          <h5>💡 まとめ</h5>
          <ul>
            <li>NotebookLMは<strong>「自社の情報を集約→専属AI化→改善を回す」</strong>に強い</li>
            <li>
              小規模事業者は<strong>"集客"より先に「紹介される素材」＋「標準化」</strong>が効く
            </li>
            <li>30日で<strong>「作る→整える→試す→残す」</strong>まで回せば、繁栄の土台になる</li>
          </ul>
        </div>
      </div>
    </details>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div v-if="showToast" class="toast-notification">
        <span class="toast-icon">✅</span>
        {{ toastMessage }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.notebooklm-generator {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-top: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.generator-collapse {
  border: none;
}

.generator-collapse > summary {
  list-style: none;
}

.generator-collapse > summary::-webkit-details-marker {
  display: none;
}

.generator-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  user-select: none;
  transition: opacity 0.15s;
}

.generator-header:hover {
  opacity: 0.8;
}

.generator-collapse:not([open]) > .generator-header {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.expand-indicator {
  font-size: 0.9rem;
  color: var(--vt-c-text-dark-2);
  transition: transform 0.2s;
  flex-shrink: 0;
  margin-left: auto;
}

.generator-collapse[open] > .generator-header .expand-indicator {
  transform: rotate(90deg);
}

.collapse-body-link {
  margin-bottom: 1rem;
}

.header-icon {
  font-size: 2.5rem;
  background: linear-gradient(135deg, var(--vt-c-brand), var(--vt-c-brand-hover));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header-texts h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0 0 0.25rem 0;
}

.subtitle {
  font-size: 0.95rem;
  color: var(--vt-c-text-dark-2);
  margin: 0;
  line-height: 1.5;
}

.nblm-link {
  display: inline-block;
  margin-top: 0.5rem;
  color: var(--vt-c-brand);
  font-weight: 600;
  text-decoration: none;
}

.nblm-link:hover {
  text-decoration: underline;
}

.guidance-steps {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  background: var(--color-background-mute);
  padding: 1rem;
  border-radius: 0.75rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.step-num {
  background: var(--vt-c-brand);
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 0.2rem 0.6rem;
  border-radius: 1rem;
  white-space: nowrap;
}

.step-desc {
  font-size: 0.95rem;
  line-height: 1.4;
  color: var(--color-text);
}

.actions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.full-width {
  grid-column: 1 / -1;
}

.action-card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 1.25rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.card-header h4 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-heading);
}

.badge {
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.source-badge {
  background: #e3f2fd;
  color: #1565c0;
}

.prompt-badge {
  background: #f3e5f5;
  color: #7b1fa2;
}

.desc {
  font-size: 0.9rem;
  color: var(--vt-c-text-dark-2);
  margin-bottom: 1rem;
  line-height: 1.4;
}

.copy-btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition:
    transform 0.1s,
    opacity 0.2s;
  color: white;
}

.copy-btn:hover {
  opacity: 0.9;
}

.copy-btn:active {
  transform: scale(0.98);
}

.primary-copy {
  background: var(--vt-c-brand);
}

.secondary-copy {
  background: #8e24aa;
}

.preview-details {
  margin-top: 1rem;
}

.preview-details summary {
  font-size: 0.85rem;
  color: var(--vt-c-text-dark-2);
  cursor: pointer;
  user-select: none;
}

.preview-details summary:hover {
  color: var(--vt-c-brand);
}

.preview-text {
  margin-top: 0.5rem;
  background: #f8f9fa;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #333;
  max-height: 200px;
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  border: 1px solid #e9ecef;
}

/* Dark mode adjustments for preview */
@media (prefers-color-scheme: dark) {
  .preview-text {
    background: #1e1e1e;
    color: #d4d4d4;
    border-color: #333;
  }
  .source-badge {
    background: #1565c0;
    color: #e3f2fd;
  }
  .prompt-badge {
    background: #7b1fa2;
    color: #f3e5f5;
  }
}

/* Advanced Section Styles */
.advanced-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px dashed var(--color-border);
}

.advanced-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.advanced-icon {
  font-size: 1.5rem;
}

.advanced-header h4 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-heading);
}

.advanced-desc {
  font-size: 0.95rem;
  color: var(--color-text);
  margin-bottom: 1.25rem;
  line-height: 1.5;
}

.studio-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.feature-card {
  background: var(--color-background-mute);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 1.25rem;
  text-align: center;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--vt-c-brand);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.feature-card h5 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-heading);
}

.feature-card p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vt-c-text-dark-2);
  line-height: 1.4;
  margin-bottom: 1rem;
}

.feature-sub {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--vt-c-brand);
  margin: 1rem 0 0.25rem 0;
}

.studio-btn {
  background: transparent;
  color: var(--vt-c-brand);
  border: 1px solid var(--vt-c-brand);
  padding: 0.5rem;
  font-size: 0.85rem;
}

.studio-btn:hover {
  background: var(--vt-c-brand);
  color: white;
}

/* Dark mode adjustments for studio card buttons */
@media (prefers-color-scheme: dark) {
  .feature-card {
    background: #1e1e1e;
  }
}

.toast-notification {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}

@media (max-width: 768px) {
  .actions-grid {
    grid-template-columns: 1fr;
  }
  .notebooklm-generator {
    padding: 1rem;
  }
}

/* ============================
   Deep Dive Guide Section
   ============================ */
.deep-dive-section {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid var(--vt-c-brand);
}

.deep-dive-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.deep-dive-icon {
  font-size: 2rem;
  line-height: 1;
}

.deep-dive-header h4 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-heading);
}

.deep-dive-subtitle {
  font-size: 0.9rem;
  color: var(--vt-c-text-dark-2);
  margin: 0.25rem 0 0 0;
}

/* Accordion */
.guide-accordion {
  margin-bottom: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  overflow: hidden;
  background: var(--color-background);
}

.guide-accordion[open] {
  border-color: var(--vt-c-brand);
}

.accordion-trigger {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  cursor: pointer;
  list-style: none;
  user-select: none;
  transition: background 0.15s;
}

.accordion-trigger:hover {
  background: var(--color-background-mute);
}

.accordion-trigger::-webkit-details-marker {
  display: none;
}

.accordion-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: var(--vt-c-brand);
  color: white;
  font-size: 0.85rem;
  font-weight: 700;
  flex-shrink: 0;
}

.accordion-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-heading);
}

.accordion-content {
  padding: 0 1.25rem 1.25rem;
}

/* Pattern Grid (Section 1) */
.pattern-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.pattern-card {
  background: var(--color-background-mute);
  border-radius: 0.6rem;
  padding: 1rem;
  border-left: 3px solid var(--vt-c-brand);
}

.pattern-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--vt-c-brand);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.4rem;
}

.pattern-card h5 {
  margin: 0 0 0.5rem 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-heading);
}

.pattern-example {
  font-size: 0.85rem;
  color: var(--vt-c-text-dark-2);
  margin: 0 0 0.25rem 0;
}

.pattern-result {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

/* Notebook Blocks (Section 2) */
.notebook-block {
  background: var(--color-background-mute);
  border-radius: 0.75rem;
  padding: 1.25rem;
  margin-bottom: 1rem;
}

.notebook-block:last-child {
  margin-bottom: 0;
}

.notebook-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.notebook-emoji {
  font-size: 1.5rem;
  line-height: 1;
}

.notebook-header h5 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-heading);
}

.notebook-subtitle {
  font-size: 0.85rem;
  color: var(--vt-c-brand);
  font-weight: 500;
  margin: 0.15rem 0 0 0;
}

.notebook-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.notebook-col h6 {
  margin: 0 0 0.5rem 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-heading);
}

.notebook-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.notebook-col li {
  font-size: 0.85rem;
  color: var(--color-text);
  padding: 0.25rem 0;
  padding-left: 1em;
  position: relative;
  line-height: 1.4;
}

.notebook-col li::before {
  content: '\2022';
  position: absolute;
  left: 0;
  color: var(--vt-c-brand);
  font-weight: bold;
}

/* Industry Grid (Section 3) */
.industry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.industry-card {
  background: var(--color-background-mute);
  border-radius: 0.75rem;
  padding: 1.25rem;
}

.industry-icon {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.industry-card h5 {
  margin: 0 0 0.75rem 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-heading);
}

.industry-card ul {
  list-style: none;
  padding: 0;
  margin: 0 0 0.75rem 0;
}

.industry-card li {
  font-size: 0.85rem;
  color: var(--color-text);
  padding: 0.2rem 0;
  padding-left: 1em;
  position: relative;
  line-height: 1.4;
}

.industry-card li::before {
  content: '\2022';
  position: absolute;
  left: 0;
  color: var(--vt-c-brand);
  font-weight: bold;
}

.industry-prompts {
  background: var(--color-background);
  border-radius: 0.5rem;
  padding: 0.75rem;
}

.prompts-label {
  font-size: 0.8rem;
  font-weight: 600;
  margin: 0 0 0.3rem 0;
  color: var(--vt-c-brand);
}

.industry-prompts p {
  font-size: 0.85rem;
  color: var(--color-text);
  margin: 0.15rem 0;
  line-height: 1.4;
}

/* Roadmap (Section 4) */
.roadmap {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.roadmap-step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.roadmap-marker {
  flex-shrink: 0;
  width: 4.5rem;
  padding: 0.35rem 0;
  text-align: center;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
}

.roadmap-marker.day1 {
  background: var(--vt-c-brand);
}
.roadmap-marker.week1 {
  background: #2196f3;
}
.roadmap-marker.week2 {
  background: #4caf50;
}
.roadmap-marker.week3 {
  background: #ff9800;
}
.roadmap-marker.week4 {
  background: #e91e63;
}

.roadmap-body h5 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-heading);
}

.roadmap-body p {
  font-size: 0.85rem;
  color: var(--vt-c-text-dark-2);
  margin: 0.15rem 0 0 0;
}

.roadmap-connector {
  width: 2px;
  height: 1rem;
  background: var(--color-border);
  margin-left: 2.2rem;
}

/* Universal Prompt (Section 5) */
.universal-desc {
  font-size: 0.9rem;
  color: var(--color-text);
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.universal-prompt-box {
  background: var(--color-background-mute);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.universal-prompt-text {
  font-size: 0.85rem;
  color: var(--color-text);
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
  line-height: 1.6;
}

.universal-copy-btn {
  background: var(--vt-c-brand);
  width: 100%;
}

/* Guide Summary */
.guide-summary {
  background: linear-gradient(135deg, rgba(66, 184, 131, 0.1), rgba(66, 184, 131, 0.05));
  border: 1px solid var(--vt-c-brand);
  border-radius: 0.75rem;
  padding: 1.25rem;
  margin-top: 1rem;
}

.guide-summary h5 {
  margin: 0 0 0.75rem 0;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-heading);
}

.guide-summary ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.guide-summary li {
  font-size: 0.9rem;
  color: var(--color-text);
  padding: 0.3rem 0;
  padding-left: 1.5em;
  position: relative;
  line-height: 1.5;
}

.guide-summary li::before {
  content: '\2705';
  position: absolute;
  left: 0;
  font-size: 0.8rem;
}

/* Mobile responsive for guide */
@media (max-width: 600px) {
  .pattern-grid,
  .industry-grid {
    grid-template-columns: 1fr;
  }

  .notebook-grid {
    grid-template-columns: 1fr;
  }

  .accordion-content {
    padding: 0 0.75rem 1rem;
  }
}
</style>
