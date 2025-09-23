<script setup>
import { RouterLink } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const { user } = useAuth()
</script>

<template>
  <main class="home-container">
    <!-- メインヒーローセクション -->
    <section class="hero-section">
      <div class="hero-content">
        
        <h1 
          class="hero-title font-display"
        >
          <span class="title-main">ビジネスネットワーキング</span>
          <span class="title-sub">の新しいかたち</span>
        </h1>
        
        <p 
          class="hero-description font-body"
        >
          地域ビジネスの発展と交流を目指し、<br>
          部員同士がつながり、共に成長していくためのプラットフォームです。
        </p>
        
        <div 
          class="hero-buttons"
        >
          <RouterLink to="/about" class="cta-button primary" v-if="!user">
            <span class="button-icon">✨</span>
            今すぐ参加する
          </RouterLink>
          <RouterLink to="/members" class="cta-button secondary">
            <span class="button-icon">👥</span>
            部員一覧へ
          </RouterLink>
          <RouterLink to="/login" class="cta-button secondary" v-if="!user">
            <span class="button-icon">🔑</span>
            ログイン
          </RouterLink>
        </div>
      </div>
      
      <div class="hero-decoration">
        <div 
          class="floating-card card-1"
        >
          <div class="card-icon">🤝</div>
          <h3>ネットワーキング</h3>
          <p>部員同士のつながりを深める</p>
        </div>
        
        <div 
          class="floating-card card-2"
        >
          <div class="card-icon">💼</div>
          <h3>ビジネス連携</h3>
          <p>新しいビジネス機会を創出</p>
        </div>
        
        <div 
          class="floating-card card-3"
        >
          <div class="card-icon">🎆</div>
          <h3>地域貢献</h3>
          <p>北谷の発展を共に支える</p>
        </div>
      </div>
    </section>
    
    <!-- About Section -->
    <section class="about-section">
      <div class="about-container">
        <div class="about-header">
          <h2 class="section-title font-display">北谷町商工会青年部<br>部員情報共有システムについて</h2>
          <p class="section-subtitle font-body">部員同士の「知る」を「つながる」に変えるプラットフォーム</p>
        </div>

        <div class="about-grid">
          <!-- 背景カード -->
          <div class="about-card">
            <h3 class="card-title font-subheading">背景：こんな課題、ありませんでしたか？</h3>
            <ul class="task-list">
              <li>
                <div class="list-icon icon-red">👤</div>
                <div>
                  <h4>顔と名前が一致しない…</h4>
                  <p>部員が多く、なかなか覚えきれない。</p>
                </div>
              </li>
              <li>
                <div class="list-icon icon-red">💼</div>
                <div>
                  <h4>お互いの事業を知らない…</h4>
                  <p>どんな仕事をしているのか具体的に知る機会が少ない。</p>
                </div>
              </li>
              <li>
                <div class="list-icon icon-red">🔗</div>
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
                <div class="list-icon icon-blue">📈</div>
                <div>
                  <h4>交流の活性化</h4>
                  <p>相互理解を深め、コミュニケーションの質を高める。</p>
                </div>
              </li>
              <li>
                <div class="list-icon icon-blue">🤝</div>
                <div>
                  <h4>ビジネスマッチングの促進</h4>
                  <p>部員同士の新たな協業や受発注のきっかけを創出。</p>
                </div>
              </li>
              <li>
                <div class="list-icon icon-blue">🌟</div>
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
              <p>アカウントを登録し、マイページでご自身のビジネスプロフィール（事業内容、提供できること、求めていること等）を入力します。</p>
            </div>
            <div class="step-arrow">→</div>
            <div class="step-item">
              <div class="step-icon">2</div>
              <p>部員一覧ページで、他のメンバーの顔写真や事業内容のプレビューを確認し、新たなビジネスの可能性を探します。</p>
            </div>
            <div class="step-arrow">→</div>
            <div class="step-item">
              <div class="step-icon">3</div>
              <p>気になる部員の詳細プロフィールを確認。より深い情報を基に、具体的な連携のアイデアを練ることができます。</p>
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
          「何を書けばいいか分からない…」そんな方のために、対話形式で質問に答えるだけでプロフィールが完成するAIアシスタント (GPTs) をご用意しました。文章作成が苦手な方も、ぜひお気軽にご利用ください。
        </p>
        <a href="https://chatgpt.com/g/g-686e38248dd08191ab49db04c0ac3c8d-qing-nian-bu-hurohuiruzuo-cheng-kun?model=gpt-4o" target="_blank" rel="noopener noreferrer" class="gpts-button">
          プロフィール作成アシスタントを使う
        </a>
      </div>
    </section>

    <!-- QR Code Section -->
    <section class="qr-code-section">
      <div class="qr-code-container">
        <h2 class="section-title-sm font-display">スマートフォンでアクセス</h2>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://chatan-members-site.web.app" alt="QR Code" class="qr-code-image">
        <p class="qr-code-text font-body">QRコードを読み取って、<br>いつでもどこでも部員情報をチェック！</p>
      </div>
    </section>

  </main>
</template>

<style scoped>
.home-container {
  min-height: calc(100vh - 80px);
  overflow-x: hidden;
}

/* ヒーローセクション */
.hero-section {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at center, var(--color-background-soft) 0%, var(--color-background) 70%);
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, 
    rgba(59, 130, 246, 0.1) 0%, 
    transparent 50%, 
    rgba(59, 130, 246, 0.05) 100%);
  pointer-events: none;
}

.hero-content {
  text-align: center;
  max-width: 1200px;
  padding: 2rem 3rem;
  z-index: 2;
  position: relative;
  width: 100%;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vt-c-brand);
  margin-bottom: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.badge-icon {
  font-size: 1.125rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background: transparent;
  border-radius: 0;
  padding: 0;
}

.hero-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.title-main {
  background: linear-gradient(135deg, var(--vt-c-brand), var(--vt-c-brand-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-sub {
  color: var(--color-heading);
  font-size: 0.8em;
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.7;
  color: var(--vt-c-text-dark-2);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.125rem;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.cta-button.primary {
  background: linear-gradient(135deg, var(--vt-c-brand), var(--vt-c-brand-hover));
  color: white;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
}

.cta-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.5);
}

.cta-button.secondary {
  background: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.cta-button.secondary:hover {
  border-color: var(--vt-c-brand);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
}

.button-icon {
  font-size: 1.25rem;
}

/* フローティングカード */
.hero-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.floating-card {
  position: absolute;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  text-align: center;
  max-width: 200px;
}

.card-1 {
  top: 15%;
  left: 5%;
  animation: float 6s ease-in-out infinite;
}

.card-2 {
  top: 60%;
  right: 5%;
  animation: float 6s ease-in-out infinite 2s;
}

.card-3 {
  bottom: 20%;
  left: 10%;
  animation: float 6s ease-in-out infinite 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.floating-card h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}

.floating-card p {
  font-size: 0.875rem;
  color: var(--vt-c-text-dark-2);
  line-height: 1.4;
}

/* About Section */
.about-section {
  padding: 6rem 2rem;
  background-color: var(--color-background-soft);
  border-top: 1px solid var(--color-border);
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
}

.about-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 1rem;
  line-height: 1.3;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--vt-c-text-dark-2);
  max-width: 600px;
  margin: 0 auto;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;
}

.about-card {
  background: var(--color-background);
  padding: 2.5rem;
  border-radius: 1.5rem;
  border: 1px solid var(--color-border);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  text-align: left;
}

.card-icon-lg {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 2rem;
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

.list-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.icon-red { color: #ef4444; }
.icon-blue { color: var(--vt-c-brand); }


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
  padding: 3rem;
  border-radius: 1.5rem;
  border: 1px solid var(--color-border);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.section-title-sm {
  text-align: center;
  font-size: 1.75rem;
  margin-bottom: 2.5rem;
  color: var(--color-heading);
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
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--vt-c-brand);
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;
  border: 3px solid var(--vt-c-brand-tint);
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

/* GPTs Section */
.gpts-section {
  padding: 6rem 2rem;
  background-color: var(--color-background);
}

.gpts-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem;
  border-radius: 1.5rem;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  text-align: center;
}

.gpts-container .section-title {
  color: var(--vt-c-brand);
}

.gpts-container .section-subtitle {
  color: var(--vt-c-text-dark-2);
  margin-bottom: 2.5rem;
}

.gpts-button {
  display: inline-block;
  padding: 1rem 2.5rem;
  background-color: var(--vt-c-brand);
  color: white;
  text-decoration: none;
  font-weight: 600;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
}

.gpts-button:hover {
  transform: translateY(-2px);
  background-color: var(--vt-c-brand-hover);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
}

/* QR Code Section */
.qr-code-section {
  padding: 4rem 2rem;
  background-color: var(--color-background);
}

.qr-code-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.qr-code-image {
  margin: 2rem 0;
  border: 6px solid white;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.qr-code-text {
  font-size: 1rem;
  color: var(--vt-c-text-dark-2);
  line-height: 1.7;
}

/* レスポンシブ対応 */
@media (max-width: 992px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .about-section {
    padding: 4rem 1rem;
  }
  .section-title {
    font-size: 2rem;
  }
  .steps-container {
    flex-direction: column;
  }
  .step-arrow {
    transform: rotate(90deg);
  }

  /* ▼▼▼ GPTsセクションのスマホ表示を修正 ▼▼▼ */
  .gpts-section {
    padding: 4rem 1rem;
  }
  .gpts-container {
    padding: 0;
    background-color: transparent;
    border: none;
  }
  /* ▲▲▲ ここまで修正 ▲▲▲ */
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 100vh;
    padding: 2rem 1rem;
  }
  
  .hero-badge {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    margin-bottom: 2.5rem;
  }
  
  .badge-icon {
    width: 2rem;
    height: 2rem;
  }
  
  .hero-title {
    font-size: 3.5rem;
    margin-bottom: 2rem;
    line-height: 1.1;
  }
  
  .title-main, .title-sub {
    display: block;
  }
  
  .hero-description {
    font-size: 1.3rem;
    line-height: 1.6;
    margin-bottom: 3rem;
  }
  
  .floating-card {
    display: none;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  
  .cta-button {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    width: 100%;
    max-width: 280px;
  }
  
  .stats-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .stats-section {
    padding: 2rem 1rem;
  }
  
  .stats-card {
    padding: 2rem 1.5rem;
  }
  
  .stat-number {
    font-size: 2.5rem;
  }
  
  .stat-label {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    min-height: 100vh;
    padding: 1.5rem 1rem;
  }
  
  .hero-content {
    padding: 0;
  }
  
  .hero-badge {
    padding: 0.5rem 1.25rem;
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }
  
  .badge-icon {
    width: 1.75rem;
    height: 1.75rem;
  }
  
  .hero-title {
    font-size: 2.8rem;
    margin-bottom: 1.5rem;
  }
  
  .hero-description {
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
  }
  
  .cta-button {
    padding: 0.875rem 2rem;
    font-size: 1rem;
    max-width: 250px;
  }
  
  .stats-section {
    padding: 2rem 1rem;
  }
  
  .stats-card {
    padding: 1.5rem 1rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .stat-label {
    font-size: 1rem;
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
  
  /* Hide unnecessary elements */
  .hero-decoration,
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
    background: none !important;
    -webkit-text-fill-color: inherit !important;
  }
  .hero-description {
    font-size: 11pt;
    color: #333 !important;
  }

  /* Adjust About section */
  .about-section, .gpts-section {
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
  
  h1, h2, h3, h4, p, span, div {
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
