<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">利用規約</h1>
      <p class="page-subtitle">北谷町商工会青年部 部員情報共有システムの利用に関する規約です。</p>
    </div>

    <div class="card content-card">
      <div class="terms-content">
        <h2>第1条（適用）</h2>
        <p>
          本規約は、北谷町商工会青年部（以下、「当青年部」といいます。）が提供する部員情報共有システム（以下、「本システム」といいます。）の利用条件を定めるものです。本システムを利用するすべての部員（以下、「ユーザー」といいます。）に適用されます。
        </p>

        <h2>第2条（目的）</h2>
        <p>
          本システムは、当青年部の部員同士の交流とビジネスマッチングを促進するための情報共有を目的としています。
        </p>

        <h2>第3条（禁止事項）</h2>
        <p>ユーザーは、本システムの利用にあたり、以下の行為をしてはなりません。</p>
        <ul>
          <li>法令または公序良俗に違反する行為</li>
          <li>犯罪行為に関連する行為</li>
          <li>
            当青年部、他のユーザー、または第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
          </li>
          <li>当青年部のサービスの運営を妨害するおそれのある行為</li>
          <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
          <li>不正アクセスをし、またはこれを試みる行為</li>
          <li>他のユーザーに成りすます行為</li>
          <li>
            当青年部、他のユーザー、または第三者の知的財産権（著作権、商標権等）、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為
          </li>
          <li>
            虚偽の情報、健康・美容関連等における薬機法に抵触する表現、誇大広告（景品表示法違反のおそれのある表現）を掲載する行為
          </li>
          <li>本システムのアカウントを第三者に譲渡、貸与、または共有する行為</li>
          <li>その他、当青年部が不適切と判断する行為</li>
        </ul>

        <h2>第4条（利用制限およびアカウント登録抹消）</h2>
        <p>
          当青年部は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して、本システムの全部もしくは一部の利用を制限し、またはアカウント登録を抹消することができるものとします。当青年部は、本条に基づき当青年部が行った行為によりユーザーに生じた損害について、一切の責任を負いません。
        </p>
        <ul>
          <li>本規約のいずれかの条項に違反した場合</li>
          <li>登録事項に虚偽の事実があることが判明した場合</li>
          <li>その他、当青年部が本システムの利用を適当でないと判断した場合</li>
        </ul>

        <h2>第5条（免責事項）</h2>
        <p>
          本システムを通じたビジネスマッチングや取引は、ユーザー間の自己責任において行われるものとします。当青年部は、ユーザー間またはユーザーと第三者との間において生じた連絡、紛争、取引の結果（損害・トラブル等）について、一切の責任を負いません。また、当青年部は、本システムに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
        </p>

        <h2>第6条（サービス内容の変更等）</h2>
        <p>
          当青年部は、ユーザーに通知することなく、本システムの内容を変更しまたは本システムの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
        </p>

        <h2>第7条（利用規約の変更）</h2>
        <p>
          当青年部は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。変更後の利用規約は、本システム上に掲示された時点から効力を生じるものとします。
        </p>

        <h2>第8条（準拠法・裁判管轄）</h2>
        <p>
          本規約の解釈にあたっては、日本法を準拠法とします。本システムに関して紛争が生じた場合には、当青年部の所在地を管轄する裁判所を専属的合意管轄とします。
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
