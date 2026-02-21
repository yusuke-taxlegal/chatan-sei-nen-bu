<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  member: {
    type: Object,
    required: true,
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

// C-1a: Slide Prompt – Strategy/Learning for the business owner
const slideStrategyPrompt = computed(() => {
  return `追加した2つのソース（ハイパワーマーケティングとプロフィール）をもとに、この事業者が「今後どのように動けば良いのか」を学べるスライド資料を作成してください。

以下の構成に沿ってください：
1) 現状分析：この事業者の強みと課題（プロフィールから読み取れるものだけ）
2) USP（独自の強み）の言語化…競合との差分を踏まえた25文字の一言化案
3) リスクリバーサル…この事業者の顧客が持つ不安を3つ特定し、それぞれの消し方を具体的に提示
4) MVPテスト案…予算0〜1万円・14日以内で試せる小さな実験を3つ提案
5) アドオン（追加提案）…既存客向けに「ついでに」売れる商品・サービスを具体的に提案
6) 30日実行プラン…Week1〜Week4のスケジュール入りで「明日何をするか」が明確な形

※スライドごとに「見出し」「ポイント」「事業者への問いかけ（㊠あなたの場合は？）」を入れて、自分事として考えられる構成にしてください。
※専門用語は噃み砕き、青年部の場に合った親しみやすいトーンで。`
})

// C-1b: Slide Prompt – Client-facing proposal
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

// C-2: Audio Prompt
const audioPrompt = computed(() => {
  return `2人のマーケティングコンサルタントが、追加されたプロフィール情報をもとに『この事業者がどうすれば地域で突出した存在（別格）になれるか』を熱く議論するラジオ番組を作ってください。ハイパワーマーケティングの視点（USPとリスクリバーサル）を必ず交えてください。`
})

// C-3: Infographic Prompt
const infographicPrompt = computed(() => {
  return `この事業者の『現状の課題』『独自の強み（USP）』『具体的なマーケティング施策（テスト・アドオンなど）』の3ステップを1枚の画像で直感的に伝えるインフォグラフィックを作成してください。専門用語は使わず、箇条書きで分かりやすく整理してください。`
})

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
    <div class="generator-header">
      <div class="header-icon">🤖</div>
      <div class="header-texts">
        <h3 class="font-subheading">NotebookLM用 プロンプト生成 (1時間セミナー向け)</h3>
        <p class="font-body subtitle">
          ボタン一つで最適化されたテキストをコピーし、NotebookLMに貼り付けられます。<br />
          <a href="https://notebooklm.google.com/" target="_blank" class="nblm-link"
            >👉 NotebookLMを開く</a
          >
        </p>
      </div>
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

.generator-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
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
</style>
