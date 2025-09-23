# 北谷町商工会青年部 会員制サイト構築手順書 (Vue.js + Firebase)

このドキュメントは、CursorとAIアシスタントのサポートを受けながら、Vue.jsとFirebaseを利用して会員制ウェブサイトの基礎を構築した際の手順をまとめたものです。

---

## 開発の全体像（ロードマップ）

1.  **【ステップ1】 開発環境の準備**: PCにNode.jsをインストールする。
2.  **【ステップ2】 Firebaseプロジェクトの作成**: データの保存場所となるバックエンドを準備する。
3.  **【ステップ3】 Vue.jsプロジェクトの作成**: サイトの見た目となるフロントエンドの雛形を作成する。
4.  **【ステップ4】 Vue.jsとFirebaseの連携**: フロントエンドとバックエンドを接続する。
5.  **【ステップ5】 動作確認（サインアップ機能の実装）**: 実際にユーザー登録機能を実装し、連携を確認する。

---

## 【ステップ1】 開発環境の準備：Node.jsのインストール

Vue.jsプロジェクトをPC上で動作させるために必要な「Node.js」という実行環境をインストールします。

1.  **インストーラーのダウンロード**:
    - [Node.js公式サイト](https://nodejs.org/)にアクセスします。
    - 「**LTS**」（Long Term Support / 長期サポート版）と書かれている方をダウンロードします。

2.  **インストール**:
    - ダウンロードしたインストーラーを起動し、画面の指示に従ってインストールを完了させます。

3.  **インストールの確認**:
    - Cursorのターミナルで以下の2つのコマンドを実行し、バージョン番号が表示されることを確認します。
      ```bash
      node -v
      npm -v
      ```

---

## 【ステップ2】 Firebaseプロジェクトの作成

ウェブサイトの裏側（バックエンド）となるFirebaseを準備します。

1.  **Firebaseコンソールにアクセス**:
    - Googleアカウントでログインした状態で、[Firebaseコンソール](https://console.firebase.google.com/)にアクセスします。

2.  **プロジェクトを作成**:
    - 「プロジェクトを作成」をクリックします。
    - プロジェクト名（例: `chatan-members-site`）を入力します。
    - Googleアナリティクスは無効にしてOKです。

3.  **ウェブアプリの登録**:
    - プロジェクトのダッシュボードで、ウェブアイコン（ `</>` ）をクリックします。
    - アプリのニックネーム（例: `seinenbu-site`）を付けて「アプリを登録」をクリックします。

4.  **Firebase SDKの追加（設定情報のコピー）**:
    - 次に表示される`const firebaseConfig = { ... };`というコードを、後で使うためにテキストエディタなどに一時的にコピーしておきます。
    - **（もし忘れても、後からプロジェクト設定 `⚙️` > `マイアプリ` > `SDK の設定と構成` > `構成` で再確認できます）**

5.  **Authentication（認証機能）の有効化**:
    - 左側メニューから「構築」>「Authentication」を選びます。
    - 「Sign-in method」タブを選択し、プロバイダの一覧から「メール/パスワード」をクリックします。
    - スイッチを「有効にする」に切り替え、「保存」をクリックします。

---

## 【ステップ3】 Vue.jsプロジェクトの作成

Cursorのターミナルを使って、ウェブサイトの雛形を作成します。

1.  **プロジェクト作成コマンドの実行**:
    - 任意のディレクトリで、ターミナルから以下のコマンドを実行します。
      ```bash
      npm create vue@latest
      ```

2.  **対話形式でのプロジェクト設定**:
    - `Need to install the following packages: ... Ok to proceed? (y)` → `y`を入力してEnter。
    - `Project name:` → `chatan-sei-nen-bu` など好きな名前を入力。
    - `Select features to include in your project:` → `Router`, `ESLint`, `Prettier` の3つをスペースキーで選択してEnter。
    - `Select experimental features ...` → 何も選択せずEnter。
    - `Skip all example code ...` → `No` を選択したままEnter。

3.  **プロジェクトフォルダへの移動と準備**:
    - ターミナルで以下のコマンドを順番に実行します。
      ```bash
      # 1. プロジェクトフォルダに移動
      cd chatan-sei-nen-bu

      # 2. 必要なライブラリをインストール
      npm install
      ```

4.  **開発サーバーの起動**:
    - 以下のコマンドで開発用のサーバーを起動します。
      ```bash
      npm run dev
      ```
    - ターミナルに表示された `http://localhost:xxxx/` のようなアドレスにアクセスし、Vueのウェルカムページが表示されれば成功です。

---

## 【ステップ4】 Vue.jsとFirebaseの連携

作成したVueプロジェクトにFirebaseを接続します。

1.  **Firebaseライブラリのインストール**:
    - 開発サーバーを一度停止（`Ctrl + C`）し、ターミナルで以下のコマンドを実行します。
      ```bash
      npm install firebase
      ```

2.  **Firebase設定ファイルの作成**:
    - `src`フォルダ内に `firebase.js` という名前で新しいファイルを作成します。
    - 以下の内容を貼り付けます。

    ```javascript
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";

    // 【重要】ここの firebaseConfig の中身を、ステップ2でコピーしたものに差し替える
    const firebaseConfig = {
      apiKey: "...",
      authDomain: "...",
      projectId: "...",
      storageBucket: "...",
      messagingSenderId: "...",
      appId: "...",
      measurementId: "..."
    };

    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    ```

3.  **`firebaseConfig`の書き換え**:
    - 上記コードの `firebaseConfig` の部分を、ステップ2でコピーしておいたあなた自身のFirebaseプロジェクトの設定情報に丸ごと置き換えて、ファイルを保存します。

---

## 【ステップ5】 動作確認（サインアップ機能の実装）

実際に会員登録機能を実装し、連携がうまくいっているか確認します。

1.  **`AboutView.vue`の書き換え**:
    - `src/views/AboutView.vue` ファイルを開き、中身をすべて削除してから、以下のコードに書き換えて保存します。

    ```vue
    <script setup>
    import { ref } from 'vue';
    import { createUserWithEmailAndPassword } from 'firebase/auth';
    import { auth } from '../firebase';

    const email = ref('');
    const password = ref('');

    const signUp = () => {
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          alert('登録に成功しました！');
        })
        .catch((error) => {
          alert('登録に失敗しました: ' + error.message);
        });
    };
    </script>

    <template>
      <div class="about">
        <h1>ユーザー登録</h1>
        <div>
          <label for="email">メールアドレス：</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div>
          <label for="password">パスワード：</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <button @click="signUp">登録する</button>
      </div>
    </template>
    ```

2.  **動作確認**:
    - 開発サーバーを再度起動（`npm run dev`）します。
    - ブラウザで `http://localhost:xxxx/about` にアクセスします。
    - テスト用のメールアドレスと6文字以上のパスワードを入力し、「登録する」ボタンをクリックします。
    - 「登録に成功しました！」というアラートが表示されればOKです。

3.  **Firebase側での確認**:
    - Firebaseコンソールの「Authentication」>「Users」タブに、今登録したメールアドレスが表示されていれば、連携は完璧に成功です。

---
## 今後のステップ

- ログイン機能の実装
- Firestoreデータベースとの連携（プロフィール情報の保存・表示）
- プロフィール編集機能の実装
- 部員一覧ページの作成
- Cloud Storageとの連携（画像のアップロード）
