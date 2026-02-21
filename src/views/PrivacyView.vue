<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">プライバシーポリシー</h1>
      <p class="page-subtitle">お客様の個人情報の取り扱いに関する方針です。</p>
    </div>

    <div class="card content-card">
      <div class="terms-content">
        <h2>1. 個人情報の収集・利用目的</h2>
        <p>
          北谷町商工会青年部（以下、「当青年部」といいます。）は、本システムを通じて以下の目的でユーザーの個人情報（氏名、会社名、連絡先、事業内容等）を収集・利用します。
        </p>
        <ul>
          <li>本システムのユーザー認証およびアカウント管理のため</li>
          <li>部員間のビジネスマッチングおよび情報共有を促進するため</li>
          <li>本システムに関する各種連絡や機能提供のため</li>
        </ul>

        <h2>2. 個人情報の第三者提供</h2>
        <p>
          当青年部は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
        </p>
        <ul>
          <li>法令に基づく場合</li>
          <li>
            人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
          </li>
          <li>
            ユーザーが本システム上に公開したプロフィール情報は、他の認証済みユーザー（部員）に対してシステム内で公開されます。
          </li>
        </ul>
        <p>
          ユーザーが、過去の取引事例など第三者の個人情報を含む内容をシステムに登録する場合は、ユーザー自身の責任において当該第三者の同意を得るものとします。
        </p>

        <h2>3. 個人情報の安全管理</h2>
        <p>
          当青年部は、個人情報の紛失、破壊、改ざん及び漏洩などを防止するため、不正アクセス対策等の適切な情報セキュリティ対策を講じます。本システムではFirebase
          Authentication等を利用し、安全なデータ管理を行っています。
        </p>

        <h2>4. Cookie（クッキー）その他の技術の利用</h2>
        <p>
          本システムは、セッション管理等に必要な範囲でローカルストレージやCookie等の技術を利用しています。第三者へのデータ提供を目的としたトラッキングCookieは使用しておりません。
        </p>

        <h2>5. 個人情報の開示・訂正・削除</h2>
        <p>
          ユーザーは、本システムのマイページを通じて、自身のプロフィール情報の確認、訂正、およびアカウントの削除（退会処理）を行うことができます。アカウントを削除した場合、関連する個人情報・画像データ等もシステム上から削除されます。
        </p>

        <h2>6. プライバシーポリシーの変更</h2>
        <p>
          当青年部は、必要に応じて本ポリシーを変更することがあります。変更後のプライバシーポリシーは、本システムに掲載したときから効力を生じるものとします。
        </p>
      </div>

      <div class="back-link">
        <RouterLink to="/" class="save-button primary">トップページへ戻る</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  padding: 2rem 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-heading);
}

.page-subtitle {
  font-size: 1.1rem;
  color: var(--vt-c-text-dark-2);
  margin-top: 0.5rem;
}

.card {
  background: linear-gradient(145deg, var(--color-background-soft), var(--color-background-mute));
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  padding: 2.5rem;
  margin-top: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.terms-content {
  color: var(--color-text);
  line-height: 1.8;
}

.terms-content h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.terms-content h2:first-child {
  margin-top: 0;
}

.terms-content p {
  margin-bottom: 1rem;
}

.terms-content ul {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.terms-content li {
  margin-bottom: 0.5rem;
}

.back-link {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
}

.save-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.save-button.primary {
  background: var(--vt-c-brand);
  color: white;
}

.save-button.primary:hover {
  background: var(--vt-c-brand-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

@media (max-width: 768px) {
  .page-container {
    padding: 1.5rem 1rem;
  }

  .card {
    padding: 1.5rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .terms-content h2 {
    font-size: 1.3rem;
  }
}
</style>
