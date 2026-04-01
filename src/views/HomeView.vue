<script setup>
import { RouterLink } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const { user } = useAuth()
</script>

<template>
  <main class="home-container">
    <section class="hero-section">
      <div class="hero-content">
        <p class="hero-kicker">コミュニティ</p>
        <h1 class="hero-title font-display">
          <span class="title-main">ビジネスネットワーキング</span>
          <span class="title-sub">の新しいかたち</span>
        </h1>

        <p class="hero-description font-body">
          地域ビジネスの発展と交流を目指し、部員同士がつながり、共に成長していくためのプラットフォームです。
        </p>

        <div class="hero-buttons">
          <RouterLink to="/about" class="cta-button primary" v-if="!user"> 今すぐ参加する </RouterLink>
          <RouterLink to="/members" class="cta-button secondary"> 部員一覧へ </RouterLink>
          <RouterLink to="/login" class="cta-button secondary" v-if="!user"> ログイン </RouterLink>
        </div>

        <div class="hero-summary" aria-label="青年部の3つの柱">
          <div class="summary-card">
            <h3 class="summary-card-title">ネットワーキング</h3>
            <p class="summary-card-text">部員同士のつながりを深める</p>
          </div>
          <div class="summary-card">
            <h3 class="summary-card-title">ビジネス連携</h3>
            <p class="summary-card-text">新しいビジネス機会を創出</p>
          </div>
          <div class="summary-card">
            <h3 class="summary-card-title">地域貢献</h3>
            <p class="summary-card-text">北谷の発展を共に支える</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about-section">
      <div class="about-container">
        <div class="about-header">
          <h2 class="section-title font-display">
            北谷町商工会青年部<br />部員情報共有システムについて
          </h2>
          <p class="section-subtitle font-body">
            部員同士の「知る」を「つながる」に変えるプラットフォーム
          </p>
        </div>

        <div class="about-grid">
          <!-- 背景カード -->
          <div class="about-card">
            <h3 class="card-title font-subheading">背景：こんな課題、ありませんでしたか？</h3>
            <ul class="task-list">
              <li>
                <div class="list-marker list-marker--issue" aria-hidden="true" />
                <div>
                  <h4>顔と名前が一致しない…</h4>
                  <p>部員が多く、なかなか覚えきれない。</p>
                </div>
              </li>
              <li>
                <div class="list-marker list-marker--issue" aria-hidden="true" />
                <div>
                  <h4>お互いの事業を知らない…</h4>
                  <p>どんな仕事をしているのか具体的に知る機会が少ない。</p>
                </div>
              </li>
              <li>
                <div class="list-marker list-marker--issue" aria-hidden="true" />
                <div>
                  <h4>連携のきっかけがない…</h4>
                  <p>協業したくても、誰に相談すれば良いか分からない。</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- 目的カード -->
          <div class="about-card">
            <h3 class="card-title font-subheading">目的：私たちが目指すこと</h3>
            <ul class="task-list">
              <li>
                <div class="list-marker list-marker--goal" aria-hidden="true" />
                <div>
                  <h4>交流の活性化</h4>
                  <p>相互理解を深め、コミュニケーションの質を高める。</p>
                </div>
              </li>
              <li>
                <div class="list-marker list-marker--goal" aria-hidden="true" />
                <div>
                  <h4>ビジネスマッチングの促進</h4>
                  <p>部員同士の新たな協業や受発注のきっかけを創出。</p>
                </div>
              </li>
              <li>
                <div class="list-marker list-marker--goal" aria-hidden="true" />
                <div>
                  <h4>青年部全体の魅力向上</h4>
                  <p>加入メリットを可視化し、組織の価値を高める。</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="how-it-works">
          <h3 class="section-title-sm font-subheading">システムの仕組み</h3>
          <div class="steps-container">
            <div class="step-item">
              <div class="step-icon">1</div>
              <p>
                アカウントを登録し、マイページでご自身のビジネスプロフィール（事業内容、提供できること、求めていること等）を入力します。
              </p>
            </div>
            <div class="step-arrow">→</div>
            <div class="step-item">
              <div class="step-icon">2</div>
              <p>
                部員一覧ページで、他のメンバーの顔写真や事業内容のプレビューを確認し、新たなビジネスの可能性を探します。
              </p>
            </div>
            <div class="step-arrow">→</div>
            <div class="step-item">
              <div class="step-icon">3</div>
              <p>
                気になる部員の詳細プロフィールを確認。より深い情報を基に、具体的な連携のアイデアを練ることができます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- GPTs Section -->
    <section class="gpts-section">
      <div class="gpts-container">
        <h2 class="section-title font-display">プロフィール作成をAIがサポート！</h2>
        <p class="section-subtitle font-body">
          「何を書けばいいか分からない…」そんな方のために、対話形式で質問に答えるだけでプロフィールが完成するAIアシスタント
          (GPTs) をご用意しました。文章作成が苦手な方も、ぜひお気軽にご利用ください。
        </p>
        <a
          href="https://chatgpt.com/g/g-686e38248dd08191ab49db04c0ac3c8d-qing-nian-bu-hurohuiruzuo-cheng-kun?model=gpt-4o"
          target="_blank"
          rel="noopener noreferrer"
          class="gpts-button"
        >
          プロフィール作成アシスタントを使う
        </a>
      </div>
    </section>

    <!-- QR Code Section -->
    <section class="qr-code-section">
      <div class="qr-code-container">
        <h2 class="section-title-sm font-display">スマートフォンでアクセス</h2>
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://chatan-members-site.web.app"
          alt="QR Code"
          class="qr-code-image"
        />
        <p class="qr-code-text font-body">
          QRコードを読み取って、<br />いつでもどこでも部員情報をチェック！
        </p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-container {
  min-height: calc(100vh - 4rem);
  overflow-x: hidden;
}

.hero-section {
  padding: 2rem 0 2.5rem;
  background: var(--color-background);
}

.hero-content {
  text-align: center;
  max-width: 40rem;
  margin: 0 auto;
  width: 100%;
}

.hero-kicker {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  margin-bottom: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--vt-c-brand);
  background: var(--vt-c-brand-tint);
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-radius: 9999px;
}

.hero-title {
  font-size: clamp(1.75rem, 5vw, 2.25rem);
  font-weight: 800;
  line-height: 1.25;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.title-main {
  color: var(--vt-c-brand);
}

.title-sub {
  color: var(--color-heading);
  font-size: 0.92em;
  font-weight: 700;
}

.hero-description {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--vt-c-text-dark-2);
  margin-bottom: 1.5rem;
  text-align: left;
}

.hero-buttons {
  display: flex;
  gap: 0.625rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
  cursor: pointer;
}

.cta-button.primary {
  background: var(--vt-c-brand);
  color: #fff;
  border: 1px solid var(--vt-c-brand);
}

.cta-button.primary:hover {
  background: var(--vt-c-brand-hover);
  border-color: var(--vt-c-brand-hover);
  color: #fff;
}

.cta-button.secondary {
  background: var(--color-background);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.cta-button.secondary:hover {
  border-color: var(--vt-c-brand);
  color: var(--vt-c-brand);
}

.hero-summary {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  text-align: left;
}

.summary-card {
  padding: 1rem 1.125rem;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
}

.summary-card-title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0 0 0.35rem;
}

.summary-card-text {
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--vt-c-text-dark-2);
  margin: 0;
}

@media (min-width: 640px) {
  .hero-summary {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }

  .hero-description {
    text-align: center;
  }
}

.about-section {
  padding: 2.5rem 0 3rem;
  background-color: var(--color-background-soft);
  border-top: 1px solid var(--color-border);
}

.about-container {
  max-width: 40rem;
  margin: 0 auto;
}

.about-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: clamp(1.375rem, 4vw, 1.75rem);
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 0.75rem;
  line-height: 1.35;
}

.section-subtitle {
  font-size: 0.9375rem;
  color: var(--vt-c-text-dark-2);
  max-width: 36rem;
  margin: 0 auto;
  line-height: 1.6;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;
}

.about-card {
  background: var(--color-background);
  padding: 1.25rem 1.25rem 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--color-border);
  text-align: left;
}

.card-icon-lg {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 1.25rem;
  text-align: center;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.task-list li {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.list-marker {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  flex-shrink: 0;
  margin-top: 0.45rem;
}

.list-marker--issue {
  background: #fecaca;
  border: 2px solid #ef4444;
}

.list-marker--goal {
  background: var(--vt-c-brand-tint);
  border: 2px solid var(--vt-c-brand);
}

.task-list h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-heading);
  margin: 0 0 0.25rem 0;
}

.task-list p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--vt-c-text-dark-2);
  margin: 0;
}

.how-it-works {
  background-color: var(--color-background);
  padding: 1.25rem 1rem 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--color-border);
}

.section-title-sm {
  text-align: center;
  font-size: 1.125rem;
  margin-bottom: 1.25rem;
  color: var(--color-heading);
  font-weight: 700;
}

.steps-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.step-item {
  flex: 1;
  text-align: center;
}

.step-icon {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: var(--vt-c-brand);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.75rem;
  border: 2px solid var(--vt-c-brand-tint);
}

.step-arrow {
  font-size: 2rem;
  color: var(--vt-c-brand);
  font-weight: 700;
}

.step-item p {
  font-size: 0.95rem;
  line-height: 1.6;
}

.gpts-section {
  padding: 2.5rem 0 3rem;
  background-color: var(--color-background);
}

.gpts-container {
  max-width: 40rem;
  margin: 0 auto;
  padding: 1.25rem 1.25rem 1.5rem;
  border-radius: 0.75rem;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  text-align: center;
}

.gpts-container .section-title {
  color: var(--vt-c-brand);
  font-size: 1.125rem;
}

.gpts-container .section-subtitle {
  color: var(--vt-c-text-dark-2);
  margin-bottom: 1.25rem;
  font-size: 0.9375rem;
}

.gpts-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.625rem 1.5rem;
  background-color: var(--vt-c-brand);
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9375rem;
  border-radius: 0.5rem;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.gpts-button:hover {
  background-color: var(--vt-c-brand-hover);
  color: #fff;
}

.qr-code-section {
  padding: 2rem 0 3rem;
  background-color: var(--color-background);
}

.qr-code-container {
  max-width: 24rem;
  margin: 0 auto;
  text-align: center;
}

.qr-code-image {
  margin: 1.25rem 0;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 0.5rem;
  background: var(--color-background);
}

.qr-code-text {
  font-size: 0.9375rem;
  color: var(--vt-c-text-dark-2);
  line-height: 1.65;
}

@media (max-width: 992px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .about-header {
    margin-bottom: 2rem;
  }

  .steps-container {
    flex-direction: column;
  }

  .step-arrow {
    transform: rotate(90deg);
  }

  .hero-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .cta-button {
    width: 100%;
    max-width: none;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 1.5rem 0 2rem;
  }
}

@media print {
  .home-container {
    min-height: auto;
    overflow-x: visible;
  }

  /* コンテンツ幅を印刷領域に合わせる */
  .hero-content,
  .about-container,
  .gpts-container,
  .qr-code-container {
    max-width: 100% !important;
    width: auto !important;
    padding: 0 1cm !important;
    margin: 0 !important;
  }

  .hero-buttons {
    display: none;
  }

  /* Adjust Hero section */
  .hero-section {
    min-height: auto;
    padding: 2rem 0;
    background: none;
  }

  .hero-title {
    font-size: 24pt;
    color: #000 !important;
  }
  .title-main {
    color: #000 !important;
  }
  .hero-description {
    font-size: 11pt;
    color: #333 !important;
  }

  /* Adjust About section */
  .about-section,
  .gpts-section {
    padding: 2rem 0;
    background: none;
    border: none;
  }

  .about-card,
  .how-it-works,
  .gpts-container {
    box-shadow: none !important;
    border: 1px solid #ccc !important;
    padding: 1.5rem;
  }

  .about-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  p,
  span,
  div {
    color: #000 !important;
  }

  .steps-container {
    flex-direction: column;
  }

  .step-arrow {
    display: none;
  }

  /* QR Code Section */
  .qr-code-section {
    padding: 2rem 0;
    background: none;
    page-break-before: always; /* Start QR code on a new page */
  }
}
</style>
